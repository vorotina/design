# OET - Text Editor Module

Text Editor is a UI control that allows input and formatting of text content

## Module listens to the following bus messages:

```
    OPEN_EDITOR
```

Opens a text editor, payload Object looks like this:

```javascript
{
    "placeholder" : <object>,
    "text": <string>,
    "fontSize": <number>,
    "fontStyle" : <string>,
    "fontFamily": <string>,
    "horizontalAlignment": <string>,
    "position": {
           "height": <number>,
           "width": <number>,
           "top": <number>,
           "left": <number>,
     }
}

```

Description of the properties:

* placeholder - Reference to TextPlaceholder in core
* text - The text content
* fontSize - The font size. Can be a decimal value (10, 14.5)
* fontStyle - The font style ("normal", "italic", "bold", "underline", "strikethrough")
* fontFamily - The font name ("Arial", "Times New Roman")
* horizontalAlignment - The horizontal alignment ("left", "center", "right")
* position - The position (in Vistapixels) for the bounding box containing the text

```
    CLOSE_EDITOR
```

Closes text editor.

## Module fires the following bus messages:

```
    UPDATE_TEXT with payload Object:

     {
        placeholder : <object>
        text : <string>,
        styles: <Array.<string>>
     }
```

Fired whenever the text is changed

```
    DELETE_TEXT  with payload Object:
    
     {
        placeholder : <object>
        text : <string>,
        styles: <Array.<string>>
     }
```

Fired whenever text is removed
