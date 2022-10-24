/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	MediaUpload
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	Button,
	RangeControl,
	__experimentalText as Text,
	TextControl,
	ColorPicker
} from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	console.log(attributes)
	let {stlUrl, stlId, stlFileName, initZoom, initColor,
		initRotationX, initRotationY, initRotationZ,
		initLightX, initLightY, initLightZ,
		borderWidth, borderHeight, updated} = attributes;
	var stlHandler;
	var stlHandler;

	jQuery(function () {
		const elm = document.getElementById(stlId)
		if (elm) {
			const canvas = elm.firstChild
			if(!canvas) {
				console.log("create")
				stlHandler = new STLHandler(stlUrl, stlId, attributes)
			} else {
				if(updated) {
					console.log("remove")
					// console.log(elm)
					// console.log(canvas)
					elm.removeChild(canvas)
					setAttributes({updated: false})
					stlHandler = new STLHandler(stlUrl, stlId, attributes)
				}
			}
		}
	})

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('設定', 'alert-block')}>
					<RangeControl
						label='ズーム'
						onChange={(number)=>{
							setAttributes({
								initZoom: number,
								updated: true
								});
						}}
						value={ initZoom }
						step={0.1}
						min={1}
						max={10}
					/>
					<RangeControl
						label="Width"
						value={ borderWidth }
						onChange={ ( value ) => setAttributes({borderWidth: value, updated: true}) }
						step={1}
						min={1}
						max={1000}

					/>
					<RangeControl
						label="Height"
						value={ borderHeight }
						onChange={ ( value ) => setAttributes({borderHeight: value, updated: true}) }
						step={1}
						min={1}
						max={1000}
					/>
					<Text>Model Color</Text>
					<ColorPicker
						color={initColor}
						onChange={ (hex8Color) => setAttributes({initColor: hex8Color, updated: true})}
						enableAlpha
					/>
					<RangeControl
						label="Rotation X"
						value={ initRotationX }
						onChange={ ( value ) => setAttributes({initRotationX: value, updated: true}) }
						step={1}
						min={-180}
						max={180}
					/>
					<RangeControl
						label="Rotation Y"
						value={ initRotationY }
						onChange={ ( value ) => setAttributes({initRotationY: value, updated: true}) }
						step={1}
						min={-180}
						max={180}
					/>
					<RangeControl
						label="Rotation Z"
						value={ initRotationZ }
						onChange={ ( value ) => setAttributes({initRotationZ: value, updated: true}) }
						step={1}
						min={-180}
						max={180}
					/>
					<RangeControl
						label="Light X"
						value={ initLightX }
						onChange={ ( value ) => setAttributes({initLightX: value, updated: true}) }
						step={10}
						min={-1000}
						max={1000}
					/>
					<RangeControl
						label="Light Y"
						value={ initLightY }
						onChange={ ( value ) => setAttributes({initLightY: value, updated: true}) }
						step={10}
						min={-1000}
						max={1000}
					/>
					<RangeControl
						label="Light Z"
						value={ initLightZ }
						onChange={ ( value ) => setAttributes({initLightZ: value, updated: true}) }
						step={10}
						min={-1000}
						max={1000}
					/>
				</PanelBody>
			</InspectorControls>
			<p { ...useBlockProps() }>
				<MediaUpload
					onSelect={ ( media ) => {
						console.log(media)
						setAttributes({
							stlId: Math.random().toString(32).substring(2),
							stlUrl: media.url,
							stlFileName: media.filename,
							updated: true
						})
						// setupPreview()
					}}
					value={ stlId }
					render={ ( { open } ) => (
						<div>
							<Button
								className={"wp-block-stl-renderer-select-button"}
								onClick={ open }>
								Select Media
							</Button>
							<Text> {stlFileName}</Text>
						</div>
					) }
				/>
				<div
					className={"wp-block-stl-renderer-stl-preview"}
					style={{width: borderWidth, height: borderHeight}}
					id={stlId}
				>
				</div>
			</p>
		</>
	);
}
