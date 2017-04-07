import FEgine from './utils/fariaEngine';

const $root = document.getElementById('animal');
/** @jsx h */
const a = (
    <ul>
        <li>item 1</li>
        <li>item 2</li>
    </ul>
);
const Fgine = new FEgine();


Fgine.render($root,a);