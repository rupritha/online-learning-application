<?php
namespace SureCart\Models;

use SureCart\Models\GalleryItem as ModelsGalleryItem;
use SureCart\Support\Contracts\GalleryItem;

/**
 * Gallery item model
 */
class GalleryItemAttachment extends ModelsGalleryItem implements GalleryItem {
	/**
	 * Create a new gallery item.
	 * This can accept a product media or a post.
	 *
	 * @param int|\WP_Post $item The item.
	 *
	 * @return void
	 */
	public function __construct( $item ) {
		$this->item = get_post( $item );
	}

	/**
	 * Get the media attribute markup.
	 *
	 * @param string $size The size of the image.
	 * @param array  $attr The attributes for the tag.
	 *
	 * @return string
	 */
	public function html( $size = 'full', $attr = [], $metadata = [] ): string {
		// If the item is not set, return null.
		if ( ! isset( $this->item->ID ) ) {
			return '';
		}

		// Handle attachments.
		$image = wp_get_attachment_image( $this->item->ID, $size, false, $attr );

		// add any styles.
		$tags = new \WP_HTML_Tag_Processor( $image );

		// get the image tag.
		$has_image = $tags->next_tag( 'img' );

		// add inline styles.
		if ( ! empty( $attr['style'] ) ) {
			if ( $has_image && ! empty( $attr['style'] ) ) {
				$tags->set_attribute( 'style', $attr['style'] );
			}
		}

		if ( $this->with_lightbox ) {
			$this->with_lightbox = false; // reset to false.

			// get the image data.
			$full_data = $this->attributes( 'full' );

			// set the lightbox state.
			wp_interactivity_state(
				'surecart/lightbox',
				array(
					'metadata' => array(
						// metadata keyed by unique image id.
						$this->id => wp_parse_args(
							$metadata,
							array(
								'uploadedSrc'      => $full_data->src,
								'imgClassNames'    => $full_data->class,
								'targetWidth'      => $full_data->width,
								'targetHeight'     => $full_data->height,
								'scaleAttr'        => false, // false or 'contain'.
								'alt'              => $full_data->alt,
								// translators: %s is the image title.
								'screenReaderText' => sprintf( __( 'Viewing image: %s.', 'surecart' ), $this->post_title ),
								'galleryId'        => get_the_ID(),
							),
						),
					),
				)
			);

			$tags->set_attribute( 'data-wp-on-async--load', 'callbacks.setImageRef' );
			$tags->set_attribute( 'data-wp-init', 'callbacks.setImageRef' );
			$tags->set_attribute( 'data-wp-on-async--click', 'actions.showLightbox' );
			$tags->set_attribute( 'data-wp-class--sc-hide', 'state.isContentHidden' );
			$tags->set_attribute( 'data-wp-class--sc-show', 'state.isContentVisible' );
			$tags->add_class( 'has-image-lightbox' );

			// add the lightbox trigger button.
			return $tags->get_updated_html() .
				'<button
					class="lightbox-trigger"
					type="button"
					aria-haspopup="dialog"
					aria-label="' . esc_attr__( 'Expand image', 'surecart' ) . '"
					data-wp-init="callbacks.initTriggerButton"
					data-wp-on-async--click="actions.showLightbox"
					data-wp-style--right="state.imageButtonRight"
					data-wp-style--top="state.imageButtonTop"
				>
				' . \SureCart::svg()->get(
						'maximize',
						[
							'width'  => 16,
							'height' => 16,
						]
					) . '
			</button>';
		}

		// return updated html.
		return $tags->get_updated_html();
	}

	/**
	 * Get the image data.
	 *
	 * @param string $size The size of the image.
	 * @param array  $attr The attributes for the tag.
	 *
	 * @return object|null
	 */
	public function attributes( $size = 'full', $attr = [] ) {
		$attachment_id = ! empty( $this->item->ID ) ? $this->item->ID : 0;
		$image         = wp_get_attachment_image_src( $attachment_id, $size, $attr['icon'] ?? false, $attr );

		if ( $image ) {
			list( $src, $width, $height ) = $image;

			$attachment = get_post( $attachment_id );
			$size_class = $size;

			if ( is_array( $size_class ) ) {
				$size_class = implode( 'x', $size_class );
			}

			$default_attr = array(
				'src'    => $src,
				'class'  => "attachment-$size_class size-$size_class",
				'alt'    => trim( strip_tags( get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ) ) ),
				'width'  => $width,
				'height' => $height,
			);

			/**
			 * Filters the context in which wp_get_attachment_image() is used.
			 *
			 * @since 6.3.0
			 *
			 * @param string $context The context. Default 'wp_get_attachment_image'.
			 */
			$context = apply_filters( 'wp_get_attachment_image_context', 'wp_get_attachment_image' );
			$attr    = wp_parse_args( $attr, $default_attr );

			$loading_attr              = $attr;
			$loading_attr['width']     = $width;
			$loading_attr['height']    = $height;
			$loading_optimization_attr = wp_get_loading_optimization_attributes(
				'img',
				$loading_attr,
				$context
			);

			// Add loading optimization attributes if not available.
			$attr = array_merge( $attr, $loading_optimization_attr );

			// Omit the `decoding` attribute if the value is invalid according to the spec.
			if ( empty( $attr['decoding'] ) || ! in_array( $attr['decoding'], array( 'async', 'sync', 'auto' ), true ) ) {
				unset( $attr['decoding'] );
			}

			/*
			 * If the default value of `lazy` for the `loading` attribute is overridden
			 * to omit the attribute for this image, ensure it is not included.
			 */
			if ( isset( $attr['loading'] ) && ! $attr['loading'] ) {
				unset( $attr['loading'] );
			}

			// If the `fetchpriority` attribute is overridden and set to false or an empty string.
			if ( isset( $attr['fetchpriority'] ) && ! $attr['fetchpriority'] ) {
				unset( $attr['fetchpriority'] );
			}

			// Generate 'srcset' and 'sizes' if not already present.
			if ( empty( $attr['srcset'] ) ) {
				$image_meta = wp_get_attachment_metadata( $attachment_id );

				if ( is_array( $image_meta ) ) {
					$size_array = array( absint( $width ), absint( $height ) );
					$srcset     = wp_calculate_image_srcset( $size_array, $src, $image_meta, $attachment_id );
					$sizes      = wp_calculate_image_sizes( $size_array, $src, $image_meta, $attachment_id );

					if ( $srcset && ( $sizes || ! empty( $attr['sizes'] ) ) ) {
						$attr['srcset'] = $srcset;

						if ( empty( $attr['sizes'] ) ) {
							$attr['sizes'] = $sizes;
						}
					}
				}
			}

			/**
			 * Filters the list of attachment image attributes.
			 *
			 * @since 2.8.0
			 *
			 * @param string[]     $attr       Array of attribute values for the image markup, keyed by attribute name.
			 *                                 See wp_get_attachment_image().
			 * @param WP_Post      $attachment Image attachment post.
			 * @param string|int[] $size       Requested image size. Can be any registered image size name, or
			 *                                 an array of width and height values in pixels (in that order).
			 */
			$attr = apply_filters( 'wp_get_attachment_image_attributes', $attr, $attachment, $size );

			return (object) $attr;
		}

		return (object) [];
	}
}
