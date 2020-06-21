import Tabs, {TabsProps} from './Tabs';
import TabsPane, {tabsPaneProps} from './TabsPane';
import { FC } from 'react';


type combineTabsType = FC<TabsProps> & {
    TabPane: FC<tabsPaneProps>;
};
const CombineTabs = Tabs as combineTabsType;
CombineTabs.TabPane = TabsPane;

export default CombineTabs;
