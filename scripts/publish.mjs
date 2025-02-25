/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */

import "zx/globals";
import semver from "semver";
import fs from "fs";

const lernaFile = fs.readFileSync("./lerna.json", "utf8");
const lerna = JSON.parse(lernaFile);

(async () => {
  try {
    const versions = (await $`git tag --points-at HEAD`).stdout
      .split(/\s/)
      .map((v) => v.trim())
      .filter((v) => !!v);

    let foundedVersion = "";

    for (const version of versions) {
      // semver.parse will check that the version has the major, minor, patch version (with optional prerelease version).
      const semantic = semver.parse(version);

      if (semantic) {
        if (lerna.version !== semantic.version) {
          console.log(
            `WARNING: ${semantic.version} founded. But, it is different with lerna's package versions.`
          );
          continue;
        }

        if (foundedVersion) {
          console.log(
            `WARNING: ${foundedVersion} already published. Only one tag can be published at once.`
          );
          continue;
        }

        foundedVersion = version;

        const isPrelease = semantic.prerelease.length > 0;

        if (isPrelease) {
          await $`lerna publish from-package --yes --dist-tag next`;
        } else {
          await $`lerna publish from-package --yes`;
        }
      }
    }

    if (foundedVersion) {
      console.log(`${foundedVersion} published to NPM`);

      console.log(`Try to create the release ${foundedVersion}`);

      const semantic = semver.parse(foundedVersion);
      if (semantic) {
        const isPrelease = semantic.prerelease.length > 0;

        await $`cd apps/extension/build/manifest-v2 && zip -r titan-extension-manifest-v2-${foundedVersion}.zip .`;
        await $`cd apps/extension/build/manifest-v3 && zip -r titan-extension-manifest-v3-${foundedVersion}.zip .`;
        await $`cd apps/extension/build/firefox && zip -r titan-extension-${foundedVersion}.firefox.zip .`;
        if (isPrelease) {
          await $`gh release create ${foundedVersion} apps/extension/build/manifest-v2/titan-extension-manifest-v2-${foundedVersion}.zip apps/extension/build/manifest-v3/titan-extension-manifest-v3-${foundedVersion}.zip apps/extension/build/firefox/titan-extension-${foundedVersion}.firefox.zip -t ${foundedVersion} --prerelease`;
        } else {
          await $`gh release create ${foundedVersion} apps/extension/build/manifest-v2/titan-extension-manifest-v2-${foundedVersion}.zip apps/extension/build/manifest-v3/titan-extension-manifest-v3-${foundedVersion}.zip apps/extension/build/firefox/titan-extension-${foundedVersion}.firefox.zip -t ${foundedVersion}`;
        }

        console.log("Release created");
      } else {
        throw new Error("Unexpected error");
      }
    } else {
      throw new Error("No version tag found");
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();

/* eslint-enable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
