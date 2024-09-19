const JoditConfig = {
        height:400,
        readonly: false, // Set to true to make the editor read-only
        saveModeInStorage: true,
        disablePlugins: "video,hr,file,ai-assistant,image,iframe,image-processor,image-properties,media,speech-recognize,table,wrap-nodes,table-keyboard-navigation,xpath,powered-by-jodit",
        buttons: "bold,italic,underline,strikethrough,eraser,ul,ol,fontsize,paragraph,lineHeight,classSpan,spellcheck,cut,copy,paste,selectall,copyformat,link,symbols",
        // Add custom styles to use your font library
        styles: {
            // Example for a custom font
            'body': {
                fontFamily: 'YourCustomFont, sans-serif', // Use your custom font here
            },
            'h1': {
                fontFamily: 'YourCustomFont, sans-serif',
            },
            'h2': {
                fontFamily: 'YourCustomFont, sans-serif',
            },
            'h3': {
                fontFamily: 'YourCustomFont, sans-serif',
            },
        },
    };

export default JoditConfig
