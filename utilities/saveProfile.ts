import fs from "frida-fs";

export const saveProfile = () => {
  const rakshaClient = Il2Cpp.domain.assembly("raksha-client").image;

  rakshaClient.class("raksha.ProtoItem").method("Read").implementation =
    function (estimated) {
      this.method("Read").invoke(estimated);

      if ((this as any).class.name == "SyncResp") {
        const json = Il2Cpp.domain.assembly("JsonFx.Json").image;
        const rakshaClient = Il2Cpp.domain.assembly("raksha-client").image;

        const o = json.class("JsonFx.Json.JsonWriterSettings").alloc();
        o.method(".ctor").invoke();

        const str = rakshaClient
          .class("raksha.RakshaJson")
          .method("Serialize")
          .invoke(this as any, o) as Il2Cpp.String;

        const parsed = JSON.parse(str.content);

        fs.writeFileSync(
          "sdcard/beatstar/profile",
          JSON.stringify(parsed, null, 2)
        );
      }
    };
};
