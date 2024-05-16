export const getRelease = async () => {
  try {
    const releaseLog = await fetch("./RELEASE_LOG.md")
    return releaseLog.text();
  } catch (error) {
    console.error(error);
  }
}