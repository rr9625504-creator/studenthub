import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ServiceItem,
  Provider,
  Booking,
  BookingStatus,
  Review,
  NotificationItem,
  CooperativeStats,
  INITIAL_SERVICES,
  INITIAL_PROVIDERS,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_COOP_STATS,
} from '../data/initialData';
import { toast } from 'sonner';

export type UserRole = 'customer' | 'provider' | 'admin';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  locality?: string;
  phone?: string;
  avatar?: string;
  providerId?: string; // if provider
}

export const DEMO_USERS: Record<UserRole, CurrentUser> = {
  customer: {
    id: 'cust-ramesh',
    name: 'Ramesh Patel',
    email: 'ramesh.patel@gmail.com',
    role: 'customer',
    locality: 'Maduravoyal',
    phone: '+91 98840 11223',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  },
  provider: {
    id: 'prov-arun',
    name: 'Arun Kumar',
    email: 'arun.plumber@giggrid.coop',
    role: 'provider',
    locality: 'Maduravoyal',
    phone: '+91 98401 23456',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    providerId: 'prov-arun',
  },
  admin: {
    id: 'admin-1',
    name: 'S. Rajendran (Co-op Director)',
    email: 'director@chennaiwest.giggrid.coop',
    role: 'admin',
    locality: 'Chennai West',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
  },
};

interface GigGridContextType {
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
  switchRole: (role: UserRole) => void;
  services: ServiceItem[];
  providers: Provider[];
  bookings: Booking[];
  reviews: Review[];
  notifications: NotificationItem[];
  coopStats: CooperativeStats;
  createBooking: (bookingInput: {
    providerId: string;
    date: string;
    timeSlot: string;
    requirement: string;
    estimatedBudget: number;
    customerAddress?: string;
    customerLocality?: string;
  }) => Booking | null;
  updateBookingStatus: (bookingId: string, newStatus: BookingStatus, notes?: string) => boolean;
  submitReview: (bookingId: string, rating: number, comment: string) => boolean;
  verifyProvider: (providerId: string, approved: boolean) => void;
  markNotificationAsRead: (notifId: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadCount: number;
  resetDemoData: () => void;
}

const GigGridContext = createContext<GigGridContextType | undefined>(undefined);

export const GigGridProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current logged in demo user
  const [currentUser, setCurrentUserState] = useState<CurrentUser>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('giggrid_current_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return DEMO_USERS.customer;
  });

  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);

  const [providers, setProviders] = useState<Provider[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('giggrid_providers');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_PROVIDERS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('giggrid_bookings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_BOOKINGS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('giggrid_reviews');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_REVIEWS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('giggrid_notifications');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [coopStats, setCoopStats] = useState<CooperativeStats>(INITIAL_COOP_STATS);

  // Sync with LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('giggrid_current_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('giggrid_providers', JSON.stringify(providers));
    }
  }, [providers]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('giggrid_bookings', JSON.stringify(bookings));
    }
  }, [bookings]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('giggrid_reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('giggrid_notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  // Recalculate coopStats dynamically based on current bookings
  useEffect(() => {
    const completedBookings = bookings.filter((b) => b.status === 'COMPLETED' || b.status === 'RATED');
    const additionalWorkerEarnings = completedBookings.reduce((sum, b) => sum + b.workerShare, 0);
    const additionalCoopFund = completedBookings.reduce((sum, b) => sum + b.coopShare, 0);

    setCoopStats({
      totalWorkersEmpowered: 520 + providers.filter((p) => p.verified).length - 10,
      totalJobsCompleted: 1450 + completedBookings.length,
      totalWorkerEarnings: 820000 + Math.round(additionalWorkerEarnings),
      coopWelfareFund: 95000 + Math.round(additionalCoopFund),
      communitiesServed: 25,
      customerSatisfaction: 4.9,
    });
  }, [bookings, providers]);

  const switchRole = (role: UserRole) => {
    const newUser = DEMO_USERS[role];
    setCurrentUserState(newUser);
    toast.success(`Switched to ${role.toUpperCase()} Demo: ${newUser.name}`);
  };

  const setCurrentUser = (user: CurrentUser) => {
    setCurrentUserState(user);
  };

  // Create booking
  const createBooking = (bookingInput: {
    providerId: string;
    date: string;
    timeSlot: string;
    requirement: string;
    estimatedBudget: number;
    customerAddress?: string;
    customerLocality?: string;
  }): Booking | null => {
    const provider = providers.find((p) => p.id === bookingInput.providerId);
    if (!provider) {
      toast.error('Provider not found');
      return null;
    }

    const budget = bookingInput.estimatedBudget || 1000;
    // 85% worker, 10% cooperative fund, 5% platform operations
    const workerShare = Math.round(budget * 0.85);
    const coopShare = Math.round(budget * 0.1);
    const platformShare = Math.round(budget * 0.05);

    const newBookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: newBookingId,
      customerId: currentUser.id,
      customerName: currentUser.name || 'Ramesh Patel',
      customerPhone: currentUser.phone || '+91 98840 11223',
      customerLocality: bookingInput.customerLocality || currentUser.locality || 'Maduravoyal',
      customerAddress:
        bookingInput.customerAddress || 'Flat 302, Green Meadows Apt, Nethaji Road, Maduravoyal',
      providerId: provider.id,
      providerName: provider.name,
      providerSkill: provider.skill,
      providerAvatar: provider.avatar,
      serviceId: provider.serviceId,
      serviceName: provider.skill,
      date: bookingInput.date,
      timeSlot: bookingInput.timeSlot,
      requirement: bookingInput.requirement,
      estimatedBudget: budget,
      workerShare,
      coopShare,
      platformShare,
      status: 'REQUESTED',
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Add notification for the provider
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientRole: 'provider',
      recipientId: provider.id,
      title: 'New Service Booking Request!',
      message: `${newBooking.customerName} requested ${provider.skill} in ${newBooking.customerLocality} for ₹${budget.toLocaleString()}.`,
      time: 'Just now',
      read: false,
      type: 'booking',
      bookingId: newBookingId,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    toast.success('Booking requested successfully! Initial status: REQUESTED');
    return newBooking;
  };

  // Update booking status with strict state machine
  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus, notes?: string): boolean => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) {
      toast.error('Booking not found');
      return false;
    }

    // State machine check
    const currentStatus = booking.status;
    const validTransitions: Record<BookingStatus, BookingStatus[]> = {
      REQUESTED: ['ACCEPTED', 'CANCELLED'],
      ACCEPTED: ['IN PROGRESS', 'CANCELLED'],
      'IN PROGRESS': ['COMPLETED'],
      COMPLETED: ['RATED'],
      RATED: [],
      CANCELLED: [],
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      toast.error(`Invalid transition from ${currentStatus} to ${newStatus}`);
      return false;
    }

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: newStatus,
            notes: notes || b.notes,
          };
        }
        return b;
      })
    );

    // If marked completed, increment provider completedJobs & coop contribution
    if (newStatus === 'COMPLETED') {
      setProviders((prev) =>
        prev.map((p) => {
          if (p.id === booking.providerId) {
            return {
              ...p,
              completedJobs: p.completedJobs + 1,
              coopContribution: p.coopContribution + booking.coopShare,
            };
          }
          return p;
        })
      );
    }

    // Notify customer
    const statusMessages: Record<string, string> = {
      ACCEPTED: `Your booking with ${booking.providerName} is confirmed for ${booking.date}.`,
      'IN PROGRESS': `${booking.providerName} has arrived and started the service.`,
      COMPLETED: `${booking.providerName} marked the service completed. Please rate your experience!`,
      CANCELLED: `Booking #${booking.id} was cancelled.`,
    };

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientRole: 'customer',
      recipientId: booking.customerId,
      title: `Booking Update: ${newStatus}`,
      message: statusMessages[newStatus] || `Booking status updated to ${newStatus}`,
      time: 'Just now',
      read: false,
      type: 'booking',
      bookingId,
    };

    setNotifications((prev) => [notif, ...prev]);
    toast.success(`Booking status changed to ${newStatus}`);
    return true;
  };

  // Submit Review
  const submitReview = (bookingId: string, rating: number, comment: string): boolean => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) {
      toast.error('Booking not found');
      return false;
    }

    if (booking.status === 'RATED') {
      toast.error('This booking has already been rated');
      return false;
    }

    if (booking.status !== 'COMPLETED') {
      toast.error('You can only rate completed bookings');
      return false;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      bookingId: booking.id,
      providerId: booking.providerId,
      customerName: currentUser.name || booking.customerName,
      customerAvatar: currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      rating,
      comment,
      date: 'Just now',
      serviceName: booking.serviceName,
    };

    setReviews((prev) => [newReview, ...prev]);

    // Update booking status to RATED
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'RATED', rating, review: comment } : b))
    );

    // Update provider rating and reviewCount
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === booking.providerId) {
          const newCount = p.reviewCount + 1;
          const newAvg = Number(((p.rating * p.reviewCount + rating) / newCount).toFixed(1));
          return {
            ...p,
            rating: newAvg,
            reviewCount: newCount,
          };
        }
        return p;
      })
    );

    // Notify provider
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientRole: 'provider',
      recipientId: booking.providerId,
      title: `⭐ New ${rating}-Star Review Received!`,
      message: `"${comment.slice(0, 70)}${comment.length > 70 ? '...' : ''}"`,
      time: 'Just now',
      read: false,
      type: 'booking',
      bookingId,
    };

    setNotifications((prev) => [notif, ...prev]);
    toast.success('Thank you! Review posted and provider rating updated.');
    return true;
  };

  // Verify Provider
  const verifyProvider = (providerId: string, approved: boolean) => {
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === providerId) {
          return {
            ...p,
            verified: approved,
            verificationStatus: approved ? 'verified' : 'rejected',
            badge: approved ? 'Verified Co-op Craftsman' : 'Application Rejected',
          };
        }
        return p;
      })
    );

    toast.success(approved ? 'Provider successfully verified and admitted to cooperative!' : 'Provider application rejected');
  };

  const markNotificationAsRead = (notifId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notifId ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const unreadCount = notifications.filter(
    (n) => !n.read && (n.recipientRole === currentUser.role || n.recipientId === currentUser.id)
  ).length;

  const resetDemoData = () => {
    setProviders(INITIAL_PROVIDERS);
    setBookings(INITIAL_BOOKINGS);
    setReviews(INITIAL_REVIEWS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentUserState(DEMO_USERS.customer);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('giggrid_current_user');
      localStorage.removeItem('giggrid_providers');
      localStorage.removeItem('giggrid_bookings');
      localStorage.removeItem('giggrid_reviews');
      localStorage.removeItem('giggrid_notifications');
    }
    toast.success('Demo data restored to initial state');
  };

  return (
    <GigGridContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        services,
        providers,
        bookings,
        reviews,
        notifications,
        coopStats,
        createBooking,
        updateBookingStatus,
        submitReview,
        verifyProvider,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadCount,
        resetDemoData,
      }}
    >
      {children}
    </GigGridContext.Provider>
  );
};

export const useGigGrid = () => {
  const context = useContext(GigGridContext);
  if (!context) {
    throw new Error('useGigGrid must be used within a GigGridProvider');
  }
  return context;
};
