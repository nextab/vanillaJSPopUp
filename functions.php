if ( ! function_exists( 'enqueue_custom_styles' ) ) {
	function enqueue_custom_styles() {
		// Add a script to show a popup on scroll on the homepage
		if((get_post_status(5000) == 'publish' || get_post_status(5000) == 'private') && !is_page(4956) ){
			wp_register_script('custom_scripts', get_stylesheet_directory_uri() . '/js/scripts.js', false, '', true);
			wp_enqueue_script('custom_scripts');
			add_action('wp_footer', 'add_popup_content');
		}
	}
}
add_action( 'wp_enqueue_scripts', 'enqueue_custom_styles' );

#region Add Popup Content to Footer
function add_popup_content() {
	echo '<div class="more_info_container survey_modal"><button class="close_button">✕</button><div class="scrollable">' . get_post_field('post_content', 5000) . '</div></div>';
	echo '<div class="trigger_more_info_container" style="display: none;"><button onclick="showSurvey()" class="show_survey_button">Angebot</button></div>';
}
#endregion