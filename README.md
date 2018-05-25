# vtree
tree component  树状图插件

[![](http://ooqymz3vm.bkt.clouddn.com/tree.png)](https://yeild.github.io/vtree/demo.html)

### Usage

1. download [vtree.min.js](https://raw.githubusercontent.com/yeild/vtree/master/dist/vtree.min.js)

2.  import vtree.min.js
```
<script src="vtree.min.js"></script>
```

3. init tree
```
const tree = vTree.init({
  el: document.getElementById('container'),
  data: [],
  showCheckbox: true,
  onCheck: function (currentNode, checkedNodes, event) {
    //
  }
})
```
further: [configuration](https://github.com/yeild/vtree/blob/master/demo.html#L43) |
[live demo](https://yeild.github.io/vtree/demo.html)

### API

##### vTree.init(option) return a vTree instance.
##### option:
<table>
    <tr>
        <th>attr</th>
        <th>desc</th>
        <th>type</th>
        <th>default</th>
    </tr>
    <tr>
        <td>el</td>
        <td>tree's container</td>
        <td>Element</td>
        <td> - </td>
    </tr>
    <tr>
        <td>data</td>
        <td>tree data</td>
        <td>Array</td>
        <td> - </td>
    </tr>
    <tr>
        <td>showCheckbox</td>
        <td>if show checkbox</td>
        <td>Boolean</td>
        <td>true</td>
    </tr>
    <tr>
        <td>slice</td>
        <td>if title.length more than this number, show ellipsis</td>
        <td>Number</td>
        <td> - </td>
    </tr>
    <tr>
        <td>onCheck</td>
        <td>execute when clicking checkbox, with 3 arguments: currentNode, checkedNodes, origin event</td>
        <td>Function</td>
        <td> - </td>
    </tr>
</table>

##### data:
<table>
    <tr>
        <th>attr</th>
        <th>desc</th>
        <th>type</th>
        <th>default</th>
    </tr>
    <tr>
        <td>title</td>
        <td>the text of tree node</td>
        <td>String</td>
        <td> - </td>
    </tr>
    <tr>
        <td>expand</td>
        <td>if expand node</td>
        <td>Boolean</td>
        <td>true</td>
    </tr>
    <tr>
        <td>checked</td>
        <td>if this node is checked (and its children will be checked)</td>
        <td>Boolean</td>
        <td>false</td>
    </tr>
    <tr>
        <td>disabled</td>
        <td>if this node is disabled (and its children will be disabled)</td>
        <td>Boolean</td>
        <td>false</td>
    <tr>
        <td>children</td>
        <td>nested children, same with data</td>
        <td>Array</td>
        <td> - </td>
    </tr>
</table>

##### instance methods:
<table>
    <tr>
        <th>method</th>
        <th>desc</th>
        <th>arguments</th>
    </tr>
    <tr>
        <td>getCheckedNodes</td>
        <td>return an Array of checked nodes</td>
        <td>none</td>
    </tr>
    <tr>
        <td>checkAll</td>
        <td>check all nodes, except disabled nodes</td>
        <td>none</td>
    </tr>
    <tr>
        <td>cancelAll</td>
        <td>cancel all checked nodes, except disabled nodes</td>
        <td>none</td>
    </tr>
</table>

### Feature
* no-dependence, use out-of-the-box
* built-in css follow *ant design*
* dispatch event between parent and children by virtual tree,  less DOM touch

### development
```
npm install
npm run dev
npm run build
```

