export const getLocation = async (lat: any, lng: any) => {
  const token = '77aa0545b3f48c'
  const locRes = await fetch(
    `https://eu1.locationiq.com/v1/reverse.php?key=${token}&lat=${lat}&lon=${lng}&format=json`
  )
  return locRes.json()
}