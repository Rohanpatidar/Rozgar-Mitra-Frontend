import React, { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import { customerApi, type ProfileResponse } from '../../../api/customer.api';
import { getApiErrorMessage } from '../../../api/client';
import { THEME_COLORS } from '../../../utils/admin.constants';

const addressText = (profile: ProfileResponse): string => {
    const address = profile.address;
    if (!address) return 'Not provided';
    return [address.apartmentNumber, address.buildingName, address.colony, address.city, address.state, address.pincode, address.country]
        .filter(Boolean)
        .join(', ') || 'Not provided';
};

export const AdminProfile: React.FC = () => {
    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        customerApi.getProfile()
            .then((response) => setProfile(response.data))
            .catch((requestError) => setError(getApiErrorMessage(requestError, 'Unable to load profile')));
    }, []);

    return (
        <Box sx={{ maxWidth: 850 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: THEME_COLORS.text, mb: 3 }}>My Profile</Typography>
            <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: '16px' }}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {!profile && !error ? <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box> : profile && (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                        <TextField label="Full Name" value={profile.name} disabled fullWidth />
                        <TextField label="Date of Birth / Age" value={profile.dob ?? 'Not provided'} disabled fullWidth />
                        <TextField label="Username" value={profile.username} disabled fullWidth />
                        <TextField label="Email" value={profile.email} disabled fullWidth />
                        <TextField label="Phone Number" value={profile.phone_number} disabled fullWidth />
                        <TextField label="Role" value={profile.role} disabled fullWidth />
                        <TextField label="Address" value={addressText(profile)} disabled fullWidth multiline sx={{ gridColumn: '1 / -1' }} />
                    </Box>
                )}
            </Paper>
        </Box>
    );
};
