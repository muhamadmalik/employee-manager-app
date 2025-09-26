const rooms = {
    ServerRoom: { minLevel: 2, open: "09:00", close: "11:00", cooldown: 15 },
    Vault: { minLevel: 3, open: "09:00", close: "10:00", cooldown: 30 },
    "R&D Lab": { minLevel: 1, open: "08:00", close: "12:00", cooldown: 10 }
  };
  
  function parseTime(time) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  }
  
  let accessHistory = {};
  
  export const simulateAccess = (req, res) => {
    try {
      const fileData = JSON.parse(req.file.buffer.toString());
      accessHistory = {};
  
      const results = fileData.map(emp => {
        const room = rooms[emp.room];
        if (!room) return { ...emp, status: "Denied", reason: "Room not found" };
  
        const reqTime = parseTime(emp.request_time);
        const open = parseTime(room.open);
        const close = parseTime(room.close);
  
        if (emp.access_level < room.minLevel) {
          return { ...emp, status: "Denied", reason: "Below required level" };
        }
  
        if (reqTime < open || reqTime > close) {
          return { ...emp, status: "Denied", reason: "Room closed at that time" };
        }
  
        const lastAccess = accessHistory[`${emp.id}-${emp.room}`];
        if (lastAccess && reqTime - lastAccess < room.cooldown) {
          return { ...emp, status: "Denied", reason: `Cooldown not finished (${room.cooldown}m)` };
        }
  
        accessHistory[`${emp.id}-${emp.room}`] = reqTime;
        return { ...emp, status: "Granted", reason: `Access granted to ${emp.room}` };
      });
  
      res.json(results);
    } catch (err) {
      res.status(400).json({ error: "Invalid file format" });
    }
  };
  