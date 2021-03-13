export const NavigationMenuHelper = {
  isSamePath
};

export default NavigationMenuHelper;

function isSamePath(path, location) {
  return location.pathname === path;
}
