"use strict";

var fs = require("fs");
var marked = require("marked");

var headRe = /# (\w+): (.*)/;

function parseYamlish(txt) {
    var start = false;
    var cfg = { title: "", tagline: "", description: "", examples: "" };
    var block = false;

    txt.split("\n").some(function (line) {
        if (!start) {
            if (!headRe.test(line)) {
                // skip non-comment lines
                return;
            }
            start = true;
        }

        if (!line.trim()) {
            return;
        } else if ("#" !== line[0]) {
            // non-comment, non-empty line: exit loop
            if (block) {
                cfg[block] = marked(cfg[block]);
                block = false;
            }
            return true;
        }

        var m = line.match(headRe);
        if (m) {
            if (block) {
                cfg[block] = marked(cfg[block]);
            }
            block = false;
            if ("|" === m[2]) {
                block = m[1];
                return;
            }
            cfg[m[1]] = m[2];
            return;
        }
        if (block) {
            if ("#" === line.trim()) {
                line = "#   ";
            }
            if ("#   " !== line.slice(0, 4)) {
                cfg[block] = marked(cfg[block]);
                block = false;
            }
        }
        if (block) {
            cfg[block] += line.slice(4) + "\n";
            return;
        }
    });
    if (block) {
        cfg[block] = marked(cfg[block]);
    }

    return cfg;
}

module.exports.parse = parseYamlish;

if (require.main === module) {
    console.info(parseYamlish(fs.readFileSync(__dirname + "/example.sh", "utf8")));
}
