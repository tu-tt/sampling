import { ListViewComponent } from './components/list-view/list-view.component';
import { TrashComponent } from './components/trash/trash.component';

export const routes = [
    {path: 'notes', component: ListViewComponent},
    {path: 'trash', component: TrashComponent},
];
