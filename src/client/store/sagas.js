import * as user from './user/saga';
import * as restaurant from './restaurant/saga';
import * as company from './company/saga';
import * as backOffice from './backOffice/saga';

export default Object.values({
  ...user,
  ...restaurant,
  ...company,
  ...backOffice,
});
