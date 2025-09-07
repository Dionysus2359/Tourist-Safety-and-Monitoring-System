const User = require('../models/user');
const Alert = require('../models/alert');
const Geofence = require('../models/geofence');
const Incident = require('../models/incident');

/**
 * Get dashboard statistics for admin panel
 */
const getDashboardStats = async (req, res, next) => {
    try {
        console.log('📊 Getting dashboard stats for admin');

        // Get all statistics in parallel for better performance
        const [
            totalUsers,
            totalAlerts,
            unreadAlerts,
            totalGeofences,
            activeGeofences,
            totalIncidents,
            todayIncidents,
            yesterdayIncidents,
            lastMonthIncidents,
            thisMonthIncidents,
            recentUsers,
            recentAlerts
        ] = await Promise.all([
            // Users stats
            User.countDocuments({ role: { $ne: 'admin' } }), // Exclude admin users from tourist count

            // Alerts stats
            Alert.countDocuments(),
            Alert.countDocuments({ read: false }),

            // Geofences stats
            Geofence.countDocuments(),
            Geofence.countDocuments({ active: true }),

            // Incidents stats
            Incident.countDocuments(),
            Incident.countDocuments({
                createdAt: {
                    $gte: new Date().setHours(0, 0, 0, 0), // Start of today
                    $lt: new Date().setHours(23, 59, 59, 999) // End of today
                }
            }),
            Incident.countDocuments({
                createdAt: {
                    $gte: new Date(Date.now() - 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0), // Start of yesterday
                    $lt: new Date(Date.now() - 24 * 60 * 60 * 1000).setHours(23, 59, 59, 999) // End of yesterday
                }
            }),
            Incident.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of last month
                    $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1) // Start of this month
                }
            }),
            Incident.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) // Start of this month
                }
            }),

            // Recent users (last 30 days)
            User.countDocuments({
                createdAt: {
                    $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                },
                role: { $ne: 'admin' }
            }),

            // Recent alerts (last 7 days)
            Alert.countDocuments({
                createdAt: {
                    $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                }
            })
        ]);

        // Calculate percentage changes
        const calculateChange = (current, previous) => {
            if (previous === 0) return current > 0 ? '+100%' : '0%';
            const change = ((current - previous) / previous) * 100;
            const sign = change >= 0 ? '+' : '';
            return `${sign}${Math.round(change)}%`;
        };

        // Build the stats object
        const stats = {
            totalTourists: {
                value: totalUsers,
                change: calculateChange(recentUsers, totalUsers - recentUsers)
            },
            activeAlerts: {
                value: unreadAlerts,
                change: calculateChange(unreadAlerts, totalAlerts - unreadAlerts)
            },
            safeZones: {
                value: activeGeofences,
                change: calculateChange(activeGeofences, totalGeofences - activeGeofences)
            },
            totalIncidents: {
                value: totalIncidents,
                change: calculateChange(thisMonthIncidents, lastMonthIncidents)
            },
            // Additional detailed stats
            detailed: {
                users: {
                    total: totalUsers,
                    recent30Days: recentUsers
                },
                alerts: {
                    total: totalAlerts,
                    unread: unreadAlerts,
                    read: totalAlerts - unreadAlerts,
                    recent7Days: recentAlerts
                },
                geofences: {
                    total: totalGeofences,
                    active: activeGeofences,
                    inactive: totalGeofences - activeGeofences
                },
                incidents: {
                    total: totalIncidents,
                    today: todayIncidents,
                    yesterday: yesterdayIncidents,
                    thisMonth: thisMonthIncidents,
                    lastMonth: lastMonthIncidents
                }
            }
        };

        console.log('✅ Dashboard stats calculated:', {
            totalTourists: stats.totalTourists.value,
            activeAlerts: stats.activeAlerts.value,
            safeZones: stats.safeZones.value,
            totalIncidents: stats.totalIncidents.value
        });

        res.status(200).json({
            success: true,
            message: "Dashboard statistics retrieved successfully",
            data: { stats }
        });

    } catch (error) {
        console.error('❌ Error getting dashboard stats:', error);
        next(error);
    }
};

module.exports = {
    getDashboardStats
};
