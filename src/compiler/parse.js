
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const startTagClose = /^\s*(\/?)>/;
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;

export function parseHTML(html) {
    const ELEMENT_TYPE = 1;
    const TEXT_TYPE = 3;
    let stack = [];
    let currentParent;
    let root;


    // 转换成语法树
    function createAstElement(tag, attrs) {
        return {
            tag,
            type: ELEMENT_TYPE,
            children: [],
            attrs,
            parent: null,
        }
    }

    function start(tag, attrs) {
        let node = createAstElement(tag, attrs);
        if (!root) {
            root = node;
        }

        if (currentParent) {
            node.parent = currentParent;
            currentParent.children.push(node);
        }
        stack.push(node);
        currentParent = node;
    }

    function chars(text) {
        text = text.replace(/\s/g,'')
        text && currentParent.children.push({
            type: TEXT_TYPE,
            text,
            parent:currentParent,
        });
    }

    function end(tag) {
       let node = stack.pop();
       currentParent = stack[stack.length - 1];
    }


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
                start(startTagMatch)
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
   return root;
}
