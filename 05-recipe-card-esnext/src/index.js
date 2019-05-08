const { __, setLocaleData } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.editor;
const { Button } = wp.components;

// import styled from "styled-components";

// const BioCard = styled.div`
//   .wp-block-gutenberg-examples-example-05-recipe-card-esnext {
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
//     color: red;
//     align-content: center;
//     text-align: center;
//   }

//   .wp-block-gutenberg-examples-example-05-recipe-card-esnext .recipe-image {
//     background: white;
//     float: right;
//     width: 50%;
//     min-height: 100px;
//     text-align: center;
//   }

//   .wp-block-gutenberg-examples-example-05-recipe-card-esnext
//     .recipe-image
//     button {
//     margin-top: 30px;
//   }

//   .wp-block-gutenberg-examples-example-05-recipe-card-esnext
//     .recipe-image
//     button.image-button {
//     margin: 0;
//     padding: 0;
//     display: block;
//   }

//   .wp-block-gutenberg-examples-example-05-recipe-card-esnext .recipe-image img {
//     display: block;
//     z-index: 1;
//     position: relative;
//   }

//   .wp-block-gutenberg-examples-example-05-recipe-card-esnext h2 {
//     font-size: 1.5em;
//   }

//   .wp-block-gutenberg-examples-example-05-recipe-card-esnext ul {
//     padding-left: 2.5em !important; /* Needs fix in Gutenberg. */
//   }

//   .wp-block-gutenberg-examples-example-05-recipe-card-esnext:after {
//     content: "";
//     clear: both;
//     display: table;
//   }
// `;

registerBlockType("gutenberg-examples/example-05-recipe-card-esnext", {
  title: __("Block: Bio Card", "gutenberg-examples"),
  icon: "index-card",
  category: "layout",
  attributes: {
    title: {
      type: "array",
      source: "children",
      selector: "h2"
    },
    mediaID: {
      type: "number"
    },
    mediaURL: {
      type: "string",
      source: "attribute",
      selector: "img",
      attribute: "src"
    },
    ingredients: {
      type: "array",
      source: "children",
      selector: ".ingredients"
    },
    instructions: {
      type: "array",
      source: "children",
      selector: ".steps"
    }
  },
  edit: props => {
    const {
      className,
      attributes: { title, mediaID, mediaURL, ingredients, instructions },
      setAttributes
    } = props;
    const onChangeTitle = value => {
      setAttributes({ title: value });
    };

    const onSelectImage = media => {
      setAttributes({
        mediaURL: media.url,
        mediaID: media.id
      });
    };
    const onChangeIngredients = value => {
      setAttributes({ ingredients: value });
    };

    const onChangeInstructions = value => {
      setAttributes({ instructions: value });
    };

    return (
      // <BioCard>
        <div className={className}>
          <RichText
            tagName="h2"
            placeholder={__("Write Recipe title…", "gutenberg-examples")}
            value={title}
            onChange={onChangeTitle}
          />
          <div className="recipe-image">
            <MediaUpload
              onSelect={onSelectImage}
              allowedTypes="image"
              value={mediaID}
              render={({ open }) => (
                <Button
                  className={mediaID ? "image-button" : "button button-large"}
                  onClick={open}
                >
                  {!mediaID ? (
                    __("Upload Image", "gutenberg-examples")
                  ) : (
                    <img
                      src={mediaURL}
                      alt={__("Upload Recipe Image", "gutenberg-examples")}
                    />
                  )}
                </Button>
              )}
            />
          </div>
          <h3>{__("ingredients", "gutenberg-examples")}</h3>
          <RichText
            tagName="ul"
            multiline="li"
            placeholder={__(
              "Write a list of ingredients…",
              "gutenberg-examples"
            )}
            value={ingredients}
            onChange={onChangeIngredients}
            className="ingredients"
          />
          <h3>{__("steps", "gutenberg-examples")}</h3>
          <RichText
            tagName="div"
            multiline="p"
            className="steps"
            placeholder={__("Write the instructions…", "gutenberg-examples")}
            value={instructions}
            onChange={onChangeInstructions}
          />
        </div>
      // </BioCard>
    );
  },
  save: props => {
    const {
      className,
      attributes: { title, mediaURL, ingredients, instructions }
    } = props;
    return (
      <div className={className}>
        <RichText.Content tagName="h2" value={title} />

        {mediaURL && (
          <img
            className="recipe-image"
            src={mediaURL}
            alt={__("Recipe Image", "gutenberg-examples")}
          />
        )}

        <RichText.Content
          tagName="h2"
          className="ingredients"
          value={ingredients}
        />

        <RichText.Content
          tagName="div"
          className="steps"
          value={instructions}
        />
      </div>
    );
  }
});
