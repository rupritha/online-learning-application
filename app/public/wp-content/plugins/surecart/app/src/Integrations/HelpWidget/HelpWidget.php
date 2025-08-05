<?php

namespace SureCart\Integrations\HelpWidget;

/**
 * Help Widget.
 */
class HelpWidget {
	/**
	 * Checklist.
	 *
	 * @var Checklist
	 */
	protected $checklist;

	/**
	 * Constructor.
	 *
	 * @param Checklist $checklist Checklist.
	 */
	public function __construct( Checklist $checklist ) {
		$this->checklist = $checklist;
	}

	/**
	 * Checklist.
	 *
	 * @return Checklist
	 */
	public function checklist() {
		return $this->checklist;
	}

	/**
	 * Bootstrap.
	 *
	 * @return void
	 */
	public function bootstrap() {
		add_action( 'admin_footer', [ $this, 'show' ], 999 );
	}

	/**
	 * Show Widget script.
	 *
	 * @return void
	 */
	public function show(): void {
		// Check if widget is enabled first
		if ( ! apply_filters( 'surecart/help_widget/show', in_array( get_current_screen()->id, \SureCart::pages()->getSureCartPageScreenIds(), true ) ) ) {
			return;
		}
		?>

		<script>
		!function(Gleap,t,i){if(!(Gleap=window.Gleap=window.Gleap||[]).invoked){for(window.GleapActions=[],Gleap.invoked=!0,Gleap.methods=["identify","setEnvironment","setTags","attachCustomData","setCustomData","removeCustomData","clearCustomData","registerCustomAction","trackEvent","setUseCookies","log","preFillForm","showSurvey","sendSilentCrashReport","startFeedbackFlow","startBot","setAppBuildNumber","setAppVersionCode","setApiUrl","setFrameUrl","isOpened","open","close","on","setLanguage","setOfflineMode","startClassicForm","initialize","disableConsoleLogOverwrite","logEvent","hide","enableShortcuts","showFeedbackButton","destroy","getIdentity","isUserIdentified","clearIdentity","openConversations","openConversation","openHelpCenterCollection","openHelpCenterArticle","openHelpCenter","searchHelpCenter","openNewsArticle","openChecklists","startChecklist","openNews","openFeatureRequests","isLiveMode"],Gleap.f=function(e){return function(){var t=Array.prototype.slice.call(arguments);window.GleapActions.push({e:e,a:t})}},t=0;t<Gleap.methods.length;t++)Gleap[i=Gleap.methods[t]]=Gleap.f(i);Gleap.load=function(){var t=document.getElementsByTagName("head")[0],i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://sdk.gleap.io/latest/index.js",t.appendChild(i)},Gleap.load(),
			Gleap.initialize("0suyWPJ1PjG0zzzBZPBVkCFUoajlj1jS")
		}}();
		</script>

		<?php
		do_action( 'surecart/help_widget/loaded' );
	}
}
