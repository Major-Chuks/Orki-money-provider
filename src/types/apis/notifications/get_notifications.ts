export type Notification = {
  id: number;
  partnerId: number;
  title: string;
  category: string;
  message: string;
  read: 0 | 1;
  details?: {
    amount: number;
    currency: string;
    depositId: number;
    reference: string;
  };
  createdAt: string;
};

export type Notifications = Notification[];

export interface NotificationGroup {
  dateGroup: string;
  notifications: Notification[];
}

function formatDateGroup(date: Date): string {
  const now = new Date();
  const dayDiff = Math.floor(
    (new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() -
      new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (dayDiff === 0) return "Today";
  if (dayDiff === 1) return "Yesterday";
  if (dayDiff <= 7) return `${dayDiff} days ago`;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function groupNotificationsByDate(
  notifications: Notification[]
): NotificationGroup[] {
  const groups: Record<string, Notification[]> = {};

  notifications.forEach((n) => {
    const dateObj = new Date(n.createdAt);
    const groupLabel = formatDateGroup(dateObj);

    const item: Notification = {
      id: n.id,
      title: n.title,
      message: n.message,
      createdAt: formatTime(dateObj),
      read: n.read,
      partnerId: n.partnerId,
      category: n.category,
    };

    if (!groups[groupLabel]) {
      groups[groupLabel] = [];
    }

    groups[groupLabel].push(item);
  });

  return Object.entries(groups)
    .map(([dateGroup, notifications]) => ({ dateGroup, notifications }))
    .sort((a, b) => {
      const getDateValue = (label: string): number => {
        if (label === "Today") return Date.now();
        if (label === "Yesterday") return Date.now() - 86400000;
        const match = label.match(/^(\d+) days ago$/);
        if (match) {
          const days = parseInt(match[1], 10);
          return Date.now() - days * 86400000;
        }
        return new Date(label).getTime();
      };

      return getDateValue(b.dateGroup) - getDateValue(a.dateGroup);
    });
}
