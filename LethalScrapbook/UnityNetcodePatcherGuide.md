## Unity Netcode Patcher Guide

This document summarizes the key points from the UnityNetcodePatcher GitHub repository for reference in the mod development process.

### Preparing Mods for Patching:

- Ensure Debug Symbols are set to `Portable` or `Embedded`.
- Add code to run methods marked with `[RuntimeInitializeOnLoadMethodAttribute]` manually, as they are not automatically executed in mod assemblies.
- Register custom NetworkObject prefabs with the Unity NetworkManager.

### Using the CLI:

- Install the CLI tool using `dotnet tool install -g Evaisa.NetcodePatcher.Cli`.
- Patch your plugin with the command `netcode-patch -nv 1.5.2 [plugin] [dependencies]`.
- The `plugin` is the path to your plugin assembly `.dll`.
- `dependencies` should include all referenced assemblies and the `Unity.Netcode.Runtime` assembly.

### Using MSBuild:

- Add the MSBuild plugin to your `.csproj` file to automatically patch output assemblies.
- Configure the plugin with `<Sdk Name="Evaisa.NetcodePatcher.MSBuild" Version="4.*" />` and other options as needed.

### Manual Patching:

- Download the latest release from the GitHub repository.
- Copy the contents of the game's `Managed` directory into the `deps` folder.
- Place patch target plugins in the `plugins` folder.
- Run the executable with the command `NetcodePatcher(.exe) -nv 1.5.2 plugins deps`.

### Programmatic API:

- Add the `dotnet-tools` NuGet source to your `NuGet.Config`.
- Add a package reference to `Evaisa.NetcodePatcher` in your `.csproj` file.
- Use `Patcher.Patch(string inputPath, string outputPath, string[] dependencyPaths)` to patch programmatically.

### Post Build Event:

- Add a post-build event to your `.csproj` file to run the patcher after building.
- Use the command `netcode-patch -nv 1.5.2 "$(TargetPath)" @(ReferencePathWithRefAssemblies->'%(Identity)', ' ')`.

This guide should be updated as the UnityNetcodePatcher tool evolves or as new versions are released.
