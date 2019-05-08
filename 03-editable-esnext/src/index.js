const { __, setLocaleData } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
import { PreviewContainer } from './editor'

registerBlockType( 'gutenberg-examples/example-03-editable-esnext', {
	title: __( 'Block: Editable', 'gutenberg-examples' ),
	icon: 'universal-access-alt',
	category: 'layout',
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
	},
	edit: ( props ) => {
		const { attributes: { content }, setAttributes, className } = props;
		const onChangeContent = ( newContent ) => {
			setAttributes( { content: newContent } );
		};
		return (
			<PreviewContainer>
				<RichText
					tagName="p"
					className={ className }
					onChange={ onChangeContent }
					value={ content }
				/>
			</PreviewContainer>
		);
	},
	save: ( props ) => {
		return (
				<RichText.Content tagName="p" value={ props.attributes.content } />
		)
	},
} );
