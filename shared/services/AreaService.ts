/*
** EPITECH PROJECT, 2024
** area
** File description:
** AreaService
*/

import { Action, Reaction, Service } from '@shared/services/types';

abstract class AreaService implements Service {
    abstract description: string;

    abstract id: string;

    abstract name: string;

    abstract imageURL: string;

    abstract actions: Action[];

    abstract reactions: Reaction[];

    setup() : Promise<void> {
        return Promise.resolve();
    }
}

export default AreaService;
