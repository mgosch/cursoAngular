import {v4 as uuid} from 'uuid';

export class DestinoViaje {
    private selected: boolean;
    servicios: string[];
    id = uuid();

    constructor(public nombre: string, public u: string, public vote: number = 0){
        this.servicios = ['pileta', 'desayuno'];
    }

    isSelected(): boolean {
        return this.selected;
    }

    setSelected(s: boolean) {
        this.selected = s;
    }

    voteUp() {
        this.vote++;
    }

    voteDown() {
        this.vote--;
    }
}