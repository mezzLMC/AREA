/*
 ** EPITECH PROJECT, 2024
 ** api
 ** File description:
 ** timer
 */

import type { Service } from '@shared/services/types'
import dailyTrigger from './dailyTrigger'
import DateTrigger from './DateTrigger'
import AreaService from '../AreaService';

class TimerService extends AreaService {

    description = 'Trigger your reactivity based on a precises date or frequences'

    id = 'timer'

    name = 'Time based services'

    reactions = []

    actions = [dailyTrigger, DateTrigger]

    imageURL = '/images/brandIcons/schedule.png'

}

const instance : Service = new TimerService();

export default instance;
