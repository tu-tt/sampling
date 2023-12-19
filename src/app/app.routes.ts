import { ListViewComponent } from './pages/notes/notes.component';
import { TrashComponent } from './pages/trash/trash.component';

export const routes = [
    {path: 'notes', component: ListViewComponent},
    {path: 'trash', component: TrashComponent},
];
