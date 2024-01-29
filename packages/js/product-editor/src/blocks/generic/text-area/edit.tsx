/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useWooBlockProps } from '@woocommerce/block-templates';
import { createElement, createInterpolateElement } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { BlockControls, RichText } from '@wordpress/block-editor';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { RTLToolbarButton } from './toolbar/toolbar-button-rtl';
import type {
	TextAreaBlockEditAttributes,
	TextAreaBlockEditProps,
} from './types';
import AligmentToolbarButton from './toolbar/toolbar-button-alignment';
import useProductEntityProp from '../../../hooks/use-product-entity-prop';

export function TextAreaBlockEdit( {
	attributes,
	setAttributes,
	context: { postType },
}: TextAreaBlockEditProps ) {
	const {
		property,
		label,
		placeholder,
		help,
		required,
		disabled,
		align,
		allowedFormats,
		direction,
	} = attributes;
	const blockProps = useWooBlockProps( attributes, {
		style: { direction },
	} );

	const contentId = useInstanceId(
		TextAreaBlockEdit,
		'wp-block-woocommerce-product-content-field__content'
	);

	// `property` attribute is required.
	if ( ! property ) {
		throw new Error(
			__( 'Property attribute is required.', 'woocommerce' )
		);
	}

	const [ content, setContent ] = useProductEntityProp< string >( property, {
		postType,
	} );

	function setAlignment( value: TextAreaBlockEditAttributes[ 'align' ] ) {
		setAttributes( { align: value } );
	}

	function changeDirection(
		value: TextAreaBlockEditAttributes[ 'direction' ]
	) {
		setAttributes( { direction: value } );
	}

	/*
	 * Check if the label needs to be interpolated,
	 * finding the `<note>...</note>` tag.
	 */
	let labelContent: string | JSX.Element = label || '';
	const hasNote = label?.match( /<note>(.*)<\/note>/ );
	if ( hasNote?.length && label ) {
		labelContent = createInterpolateElement( label, {
			note: (
				<span className="wp-block-woocommerce-product-text-area-field__label_note">
					{ hasNote[ 1 ] }
				</span>
			),
		} );
	}

	const blockControlsProps = { group: 'block' };

	return (
		<div className={ 'wp-block-woocommerce-product-text-area-field' }>
			<BlockControls { ...blockControlsProps }>
				<AligmentToolbarButton
					align={ align }
					setAlignment={ setAlignment }
				/>

				<RTLToolbarButton
					direction={ direction }
					onChange={ changeDirection }
				/>
			</BlockControls>

			<BaseControl
				id={ contentId.toString() }
				label={ labelContent }
				help={ help }
			>
				<div { ...blockProps }>
					<RichText
						id={ contentId.toString() }
						identifier="content"
						tagName="p"
						value={ content || '' }
						onChange={ setContent }
						data-empty={ Boolean( content ) }
						className={ classNames( {
							[ `has-text-align-${ align }` ]: align,
						} ) }
						dir={ direction }
						allowedFormats={ allowedFormats }
						placeholder={ placeholder }
						required={ required }
						disabled={ disabled }
					/>
				</div>
			</BaseControl>
		</div>
	);
}
