export var Environment;
(function (Environment) {
    Environment["DEVELOPMENT"] = "development";
    Environment["STAGING"] = "staging";
    Environment["PRODUCTION"] = "production";
})(Environment || (Environment = {}));
export var FileType;
(function (FileType) {
    FileType["HTML"] = "html";
    FileType["CSS"] = "css";
    FileType["JS"] = "js";
    FileType["IMAGE"] = "image";
    FileType["FONT"] = "font";
    FileType["JSON"] = "json";
    FileType["XML"] = "xml";
    FileType["OTHER"] = "other";
})(FileType || (FileType = {}));
export var ScriptPosition;
(function (ScriptPosition) {
    ScriptPosition["HEAD"] = "head";
    ScriptPosition["BODY_START"] = "body_start";
    ScriptPosition["BODY_END"] = "body_end";
})(ScriptPosition || (ScriptPosition = {}));
export var CDNProvider;
(function (CDNProvider) {
    CDNProvider["CLOUDFLARE"] = "cloudflare";
    CDNProvider["CLOUDFRONT"] = "cloudfront";
    CDNProvider["FASTLY"] = "fastly";
    CDNProvider["AKAMAI"] = "akamai";
    CDNProvider["CUSTOM"] = "custom";
})(CDNProvider || (CDNProvider = {}));
//# sourceMappingURL=generator.js.map