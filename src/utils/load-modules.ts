import { promises as fs } from "fs";
import * as path from "path";

export async function loadModules(directory: string){
  const modules = [];
  const files = await fs.readdir(directory, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      modules.push(...await loadModules(path.join(directory, file.name)));
    } else if (file.name.endsWith(".module.ts")) {
      const modulePath = path.join(directory, file.name);
      const importedModule = await import(modulePath);
      Object.values(importedModule).forEach((exported) => {
        if (exported.constructor.name === "Module") {
          modules.push(exported);
        }
      });
    }
  }

  return modules;
}
