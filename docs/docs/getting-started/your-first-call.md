# Your first API call
Once you have installed and imported the InorigoJS library you can create a new API instance as seen below.

```html
<script>
const API = new inorigojs.InorigoAPI("https://www.myinorigo.com/", {})
const KSAPI = API.knowledgeset()
API.login("username", "password").then(() => {
    KSAPI.getTreeResult("00000000-0000-0000-0000-000000000000").then((result) => {
        console.log(result.data)
    })
})
</script>
```

So what is going on here?

The InorigoJS object holds references to different utility classes, including the API class seen above, a data parser, entity factory, and so on. The API class has instance functions that return communication instances of each respective API of Inorigo, but with one shared root.

To learn more about the different parts of InorigoJS and how to use the API classes, check out the documentation!