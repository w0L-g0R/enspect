import { VideoSource } from './video-player.models';

const layoutPrefix = "assets/animations/layout/"
const viewsPrefix = "assets/animations/views/"
const viewBalancesPrefix = "assets/animations/views/config/features/balances/"
const viewRegionsPrefix = "assets/animations/views/config/features/regions/"

export const videoSources: VideoSource = {
	background: layoutPrefix + "Background.webm",
	mainFrame: layoutPrefix + "MainFrame.webm",
	display: layoutPrefix + "Display.webm",
	selectionInfo: layoutPrefix + "SelectionInfo.webm",
	buttonCube: layoutPrefix + "ButtonCube.webm",
	buttonConfig: layoutPrefix + "ButtonConfig.webm",
	buttonChart: layoutPrefix + "ButtonChart.webm",
	logo: layoutPrefix + "Logo.webm",

	initDescription: viewsPrefix + "Description.webm",
	configInfo: viewsPrefix + "ConfigInfo.webm",

	balances: viewBalancesPrefix + "Balances.webm",
	buttonEB: viewBalancesPrefix + "ButtonEB.webm",
	buttonUA: viewBalancesPrefix + "ButtonUA.webm",
	buttonRES: viewBalancesPrefix + "ButtonRES.webm",

	region_0: viewRegionsPrefix + "Wien.webm",
	region_1: viewRegionsPrefix + "Niederösterreich.webm",
	region_2: viewRegionsPrefix + "Oberösterreich.webm",
	region_3: viewRegionsPrefix + "Burgenland.webm",
	region_4: viewRegionsPrefix + "Kärnten.webm",
	region_5: viewRegionsPrefix + "Salzburg.webm",
	region_6: viewRegionsPrefix + "Steiermark.webm",
	region_7: viewRegionsPrefix + "Vorarlberg.webm",
	region_8: viewRegionsPrefix + "Tirol.webm",
	region_9: viewRegionsPrefix + "Austria.webm"
}
