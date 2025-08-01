//utility function for handling the api request with loading and error handling
const requestHandler = async (api, setLoading, onSuccess, onError) => {
  setLoading && setLoading(true);
  try {
    const response = await api();
    const { data } = response;
    if (data?.success) {
      onSuccess(data);
    }
  } catch (error) {
    if ([401, 403].includes(error?.response?.data?.statusCode)) {
      localStorage.clear();
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    onError(error?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading && setLoading(false);
  }
};

// Utility: Check if we are in the browser
const isBrowser = typeof window !== "undefined";

//class to interact with localstorage safely

class LocalStorage {
  static get(key) {
    if (!isBrowser) return null;
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  static set(key, value) {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key) {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}

export {
    requestHandler,
    isBrowser,
    LocalStorage
}