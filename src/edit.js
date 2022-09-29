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
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck, PlainText } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button, RangeControl, __experimentalText as Text} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

// import '../lib/js/three.min'
// import '../lib/js/STLLoader'
// import '../lib/js/OrbitControls'
// import '../lib/js/STLHandler'

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

	let {stlUrl, stlId, stlFileName, initZoom} = attributes;

	const setupPreview = function () {
		const stlHandler = new STLHandler(stlUrl, stlId)
	};

	// if(stlUrl && stlId) setupPreview();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('設定', 'alert-block')}>
					<RangeControl
						label='ズーム'
						onChange={(number)=>{setAttributes({initZoom: number});}}
						value={ initZoom }
						step={0.1}
						min={1}
						max={3}
					/>
				</PanelBody>
			</InspectorControls>
			<p { ...useBlockProps() }>
				<MediaUpload
					onSelect={ ( media ) => {
							console.log(media)
							setAttributes({stlId: Math.random().toString(32).substring(2), stlUrl: media.url, stlFileName: media.filename})
						}
					}
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
					id={stlId}
				>
				</div>
				{/*<div className="wp-block-stl-renderer-stl-model"*/}
				{/*	 id={stlID}*/}
				{/*	 style="width: 500px; height: 500px">*/}
				{/*</div>*/}
				{/*<script type="text/javascript">*/}
				{/*	(function ($) {*/}
				{/*		$(document).ready(function () {*/}
				{/*			STLHandler(stlUrl, stlID);*/}
				{/*		});*/}
				{/*	}(jQuery));*/}
				{/*</script>*/}
			</p>
		</>
	);
}
