const { __, setLocaleData } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;

const {
	RichText,
	AlignmentToolbar,
	BlockControls,
} = wp.editor;

import styled from 'styled-components'

const EditContainer = styled.div`
	.wp-block-gutenberg-examples-example-04-controls-esnext {
		color: #222222;
		background: lightgray;
		border: 2px solid gray;
		padding: 20px;
}
`;

registerBlockType( 'gutenberg-examples/example-04-controls-esnext', {
	title: __( 'Block: Paragraph', 'gutenberg-examples' ),
	icon: 'universal-access-alt',
	category: 'layout',
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
	},
	edit: ( props ) => {
		const {
			attributes: {
				content,
				alignment,
			},
			className,
		} = props;

		const onChangeContent = ( newContent ) => {
			props.setAttributes( { content: newContent } );
		};

		const onChangeAlignment = ( newAlignment ) => {
			props.setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
		};

		return (
			<div>
				{
					<BlockControls>
						<AlignmentToolbar
							value={ alignment }
							onChange={ onChangeAlignment }
						/>
					</BlockControls>
				}
				<EditContainer>
					<RichText
						className={ className }
						style={ { textAlign: alignment } }
						tagName="p"
						onChange={ onChangeContent }
						value={ content }
					/>
				</EditContainer>
			</div>
		);
	},
	save: ( props ) => {
		return (
			<EditContainer>
				<RichText.Content
					className={ `gutenberg-examples-align-${ props.attributes.alignment }` }
					tagName="p"
					value={ props.attributes.content }
				/>
			</EditContainer>
		);
	},
} );
