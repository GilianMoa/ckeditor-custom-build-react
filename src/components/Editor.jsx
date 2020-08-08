import React, { Component } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'

import UploadAdapter from '../ckeditor5-uploadAdapter/UploadAdapter'

class Editor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            editorContent: ''
        }
    }

    customUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader);
        };
    }

    render() {
        return (
            <div className="EditorContainer">
                <CKEditor
                    editor={BalloonEditor}

                    onInit={editor => {
                        this.customUploadAdapterPlugin(editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        this.setState({ editorContent: data });
                    }}
                    config={{

                        toolbar: {
                            items: [
                                'undo',
                                'redo',
                                '|',
                                'heading',
                                'fontFamily',
                                'fontSize',
                                '|',
                                'bold',
                                'italic',
                                'underline',
                                'fontBackgroundColor',
                                'fontColor',
                                'highlight',
                                '|',
                                'link',
                                'imageUpload',
                                'mediaEmbed',
                                '|',
                                'alignment',
                                '|',
                                'bulletedList',
                                'numberedList',
                                'indent',
                                'outdent',
                                '|',
                                'blockQuote',
                                'insertTable',
                                'code',
                                'codeBlock',
                                'horizontalLine',
                                'pageBreak',
                                'strikethrough',
                                'subscript',
                                'superscript'
                            ]
                        },
                        image: {
                            styles: [
                                'alignLeft', 'alignCenter', 'alignRight'
                            ],
                            toolbar: [
                                'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                                '|',
                                'imageTextAlternative'
                            ]
                        },
                        table: {
                            contentToolbar: [
                                'tableColumn',
                                'tableRow',
                                'mergeTableCells',
                                'tableCellProperties',
                                'tableProperties'
                            ]
                        },
                        // This value must be kept in sync with the language defined in webpack.config.js.
                        language: 'en'
                    }}
                />
            </div>

        )
    }
}

export default Editor 
