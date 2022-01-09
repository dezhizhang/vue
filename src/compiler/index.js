
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const startTagClose = /^\s*(\/?)>/;
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;

function parseHTML(html) {
    function advance(n) {
        html = html.substring(n);
    }
    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: [],
            }
            advance(start[1].length);

            let attr, end;
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length);
                match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] })
            }

            if (end) {
                advance(end[0].length);
            }
            return match;

        }
        return false;
    }
    while (html) {
        let textEnd = html.indexOf('<');
        if (textEnd === 0) {
            const startTagMatch = parseStartTag();
            if (startTagMatch) {
                continue;
            }
            let endTagMatch = html.match(endTag);
            if (endTag) {
                advance(endTagMatch[0].length);
                continue
            }
            break;
        }
        if (textEnd > 0) {
            let text = html.substring(0, textEnd);
            if (text) {
                advance(text.length);
            }
        }
    }
    console.log(html);
}


export function compileToFunction(template) {
    parseHTML(template);
}