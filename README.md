# origamic.js

A JavaScript plug-in for generating Origamic Architecture.  
origamic.js は折り紙建築を生成して動かすためのJavaScriptプラグインです。

<p align="center">
  <img src="http://cobitoworks.jp/origamic/yoshiakist_origamic_architecture.jpg" alt="Origamic Architecture made by Yoshiakist" width="300"/>
</p>

## Demo 

[Live Demo](http://cobitoworks.jp/origamic/)

## Usage

```html
<div class="origamic_container" id="container1"></div>
<div class="origamic_controller">
    <div class="origamic_controll_bar" id="bar1">
        <div class="origamic_controll_tab" id="tab1"></div>
    </div>
</div>
    
<script src="./js/origamic.js"></script>
<script>
    origamic1 = new Origamic({
        selector: '#container1',
        controlTab: '#tab1',
        controlBar: '#bar1',
        perspective: 1000,
        initialAngle: 45,
        unitWidth: 40,
        unitHeight: 40,
        blocks: [
            [10, 10],
            [10, 10],
            [6, 1, 4, 9],
            [6, 2, 4, 8],
            [6, 3, 4, 7],
            [6, 4, 4, 6],
            [10, 10],
            [10, 10]
        ],
        centerLine: 10,
        wholeShadow: true
    });
</script>
```


## Documentation

準備中...

## License

MIT

## Author

[yoshiakist](https://github.com/yoshiakist)
