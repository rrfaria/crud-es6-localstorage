/** @jsx h */
export default class FEgine {
    constructor() {
    }

    static h(type, props, ...children) {
        return { type, props, children };
    }

    static createElement(node) {
        if (typeof node === 'string') {
            return document.createTextNode(node);
        }
        const $el = document.createElement(node.type);
        node.children
            .map(FEgine.createElement)
            .forEach($el.appendChild.bind($el));
        return $el;
    }

    static changed(node1, node2) {
        return typeof node1 !== typeof node2 ||
            typeof node1 === 'string' && node1 !== node2 ||
            node1.type !== node2.type
    }

    render($parent, newNode, oldNode, index = 0) {
        if (!oldNode) {
            $parent.appendChild(
                FEgine.createElement(newNode)
            );
        } else if (!newNode) {
            $parent.removeChild(
                $parent.childNodes[index]
            );
        } else if (FEgine.changed(newNode, oldNode)) {
            $parent.replaceChild(
                FEgine.createElement(newNode),
                $parent.childNodes[index]
            );
        } else if (newNode.type) {
            const newLength = newNode.children.length;
            const oldLength = oldNode.children.length;
            for (let i = 0; i < newLength || i < oldLength; i++) {
                FEgine.render(
                    $parent.childNodes[index],
                    newNode.children[i],
                    oldNode.children[i],
                    i
                );
            }
        }
    }
    
}