import { test } from './Authentication.test';
import { test as _test } from './Dashboard.test';
import { test as __test } from './Milestone.test';
import { test as ___test } from './Calendar.test';
import { test as ____test } from './Competency.test';

beforeEach(() => {
    driver.launchApp();
});

afterEach(() => {
    driver.closeApp();
});

test();
_test();
__test();
___test();
____test();
