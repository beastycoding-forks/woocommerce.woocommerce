<?php

namespace Automattic\WooCommerce\Internal;

use Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessorInterface;

class OrderCouponDataMigrator implements BatchProcessorInterface {

	public function get_name(): string {
		return "Coupon line item 'coupon_data' to 'coupon_reapply_info' metadata migrator";
	}

	public function get_description(): string {
		return "Migrates verbose metadata about coupons applied to an order ('coupon_data' metadata key in coupon line items) to simplified metadata ('coupon_reapply_info' keys)";
	}

	public function get_total_pending_count(): int {
		global $wpdb;

		return $wpdb->get_var(
			$wpdb->prepare(
				"SELECT COUNT(*) FROM {$wpdb->prefix}wp_woocommerce_order_itemmeta WHERE meta_key=%s",
				'coupon_data'
			)
		);
	}

	public function get_next_batch_to_process(int $size): array
	{
		// TODO: Implement get_next_batch_to_process() method.
	}

	public function process_batch(array $batch): void
	{
		// TODO: Implement process_batch() method.
	}

	public function get_default_batch_size(): int {
		return 100;
	}
}
