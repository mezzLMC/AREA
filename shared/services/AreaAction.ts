/*
** EPITECH PROJECT, 2024
** area
** File description:
** AreaAction
*/

import { Action, Enrichment } from '@shared/services/types';
import { Field } from '@/types';

abstract class AreaAction implements Action {
    abstract description: string;

    abstract name: string;

    abstract id: string;

    abstract enrichments: Enrichment[];

    abstract generateFields(userId: number): Promise<Field[]>;

    abstract add(userId: number, fields: Record<string, string>): Promise<number>;

    poll(): Promise<void> {
        return Promise.resolve();
    }

    setup(): Promise<void> {
        return Promise.resolve();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    webhook(id: number, req: Request): Promise<Response> {
        return Promise.resolve(new Response(null, { status: 200 }));
    }
}

export default AreaAction;
