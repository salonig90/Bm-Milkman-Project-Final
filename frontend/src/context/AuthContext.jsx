import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (partial) => {
    setUser((prev) => {
      const next = { ...(prev || {}), ...(partial || {}) };
      localStorage.setItem('dairy_user', JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('dairy_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);

      // Backfill missing profile fields for older sessions that only stored { username }.
      // This keeps existing logins working without forcing a logout/login.
      if (parsed && !parsed.email && (parsed.username || parsed.name)) {
        const controller = new AbortController();
        fetch('/api/customers/', { signal: controller.signal })
          .then((r) => (r.ok ? r.json() : Promise.reject(new Error('customers fetch failed'))))
          .then((customers) => {
            const lookupName = String(parsed.username || parsed.name).trim().toLowerCase();
            const match = (customers || []).find(
              (c) => String(c?.name || '').trim().toLowerCase() === lookupName
            );
            if (match?.email) {
              updateUser({ ...match, username: parsed.username || match.name });
            }
          })
          .catch(() => {});

        return () => controller.abort();
      }
    }
  }, []);

  const login = (customer) => {
    // Backward compatible: older code passed just a string username.
    const userData =
      typeof customer === 'string'
        ? { username: customer }
        : {
            ...customer,
            username: customer?.username || customer?.name || customer?.email || 'User',
          };

    setUser(userData);
    localStorage.setItem('dairy_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dairy_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
