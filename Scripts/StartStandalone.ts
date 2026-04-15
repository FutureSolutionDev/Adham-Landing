/**
 * StartStandalone.ts
 * Prepares the Next.js standalone output and starts it through Bun.
 * Uses Node-compatible APIs so the script type-checks without Bun-specific globals.
 */

import { cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

/**
 * Removes a path when it exists.
 * @param TargetPath - File-system path to delete
 */
const RemoveIfExists = async (TargetPath: string): Promise<void> => {
 if (!existsSync(TargetPath)) return;
 await rm(TargetPath, { recursive: true, force: true });
};

/**
 * Copies a directory recursively when the source exists.
 * @param SourcePath - Source directory path
 * @param DestinationPath - Destination directory path
 */
const CopyDirectory = async (SourcePath: string, DestinationPath: string): Promise<void> => {
 if (!existsSync(SourcePath)) return;
 await cp(SourcePath, DestinationPath, { recursive: true });
};

/**
 * Prepares the standalone folder contents expected by Next.js production runtime.
 */
const PrepareStandalone = async (): Promise<void> => {
 const ProjectRoot = process.cwd();
 const StandaloneRoot = join(ProjectRoot, ".next", "standalone");
 const StandalonePublicPath = join(StandaloneRoot, "public");
 const StandaloneStaticPath = join(StandaloneRoot, ".next", "static");
 const PublicPath = join(ProjectRoot, "public");
 const StaticPath = join(ProjectRoot, ".next", "static");

 await RemoveIfExists(StandalonePublicPath);
 await RemoveIfExists(StandaloneStaticPath);
 await CopyDirectory(PublicPath, join(StandaloneRoot, "public"));
 await CopyDirectory(StaticPath, join(StandaloneRoot, ".next", "static"));
};

/**
 * Starts the standalone Next.js server through Bun.
 * @returns Promise resolved when the Bun child process exits cleanly
 */
const StartServer = async (): Promise<void> => {
 const Port = process.env.PORT ?? "3031";
 const StandaloneRoot = join(process.cwd(), ".next", "standalone");
 const ServerEntry = join(StandaloneRoot, "server.js");
 const SharpPath = join(StandaloneRoot, "node_modules", "sharp");

 await new Promise<void>((Resolve, Reject) => {
  const Child = spawn("bun", [ServerEntry], {
   cwd: process.cwd(),
   env: {
    ...process.env,
    PORT: Port,
    NEXT_SHARP_PATH: existsSync(SharpPath) ? SharpPath : ""
   },
   stdio: "inherit"
  });

  Child.on("error", Reject);
  Child.on("exit", (Code) => {
   if (Code === 0) {
    Resolve();
    return;
   }

   Reject(new Error(`Standalone server exited with code ${Code ?? "unknown"}`));
  });
 });
};

/**
 * Main entrypoint.
 */
const Main = async (): Promise<void> => {
 await PrepareStandalone();
 await StartServer();
};

await Main();
