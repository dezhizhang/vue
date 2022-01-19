import { parseHTML } from './parse';

const defaultTagReg = /\{\{((?:.|\r?\n)+?)\}\}/g


function genProps(attrs) {
    let str = '';
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];
        if (attr.name === 'style') {
            let obj = {};
            attr.value.split(';').forEach(item => {
                let [key, value] = item.split(':');
                obj[key] = value;
            });
            attr.value = obj;
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    return `{${str.slice(0, -1)}}`;
}


function gen(node) {
    if(node.type === 1) {
        return codeGen(node);
    }else {
        const text = node.text;
        if(!defaultTagReg.test(text)) {
            return `h(${JSON.stringify(text)})`;
        }else {
            let tokens = [];
            let match;
            defaultTagReg.lastIndex = 0;
            console.log(text);
            while(defaultTagReg.exec(text)) {
                let index = match.index;
                tokens.push(`_${match[1].trim()}`)
            }
        }
    }
}

function genChildren(children) {
    if(children) {
        return children.map(child => gen(child)).join(',')
    }
}


function codeGen(ast) {
    let children = genChildren(ast.children);
    let code = `h('${ast.tag}',${ast.attrs && ast.attrs.length > 0 ? genProps(ast.attrs) : 'null'},${ast.children.length ? children : ''})`;
    return code;
}

export function compileToFunction(template) {
    console.log(template);
    let ast = parseHTML(template);
    let code = codeGen(ast);
    console.log('ast',code);
}