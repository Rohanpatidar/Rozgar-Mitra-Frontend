import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, Button, CircularProgress, Alert } from '@mui/material';
import Grid from '@mui/material/Grid'; // Make sure to import Grid2 in newer MUI versions, or keep it Grid but use 'size'
import { customerApi, type ProfileResponse } from '../../../api/customer.api';
import { getApiErrorMessage } from '../../../api/client';
import { LABOUR_THEME } from '../../../utils/labour.constants';
import { VALIDATION } from '../../../utils/constants';
import { formatPhoneNumber, sanitizeFullName, validateFullName, validatePhoneNumber } from '../../../utils/validation';

interface ProfileErrors {
    name?: string;
    phone?: string;
    address?: string;
}

export const EditProfile: React.FC = () => {
    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<ProfileErrors>({});
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        customerApi.getProfile().then((response) => {
            setProfile(response.data);
            setName(response.data.name ?? '');
            setPhone(response.data.phone_number ?? '');
            setAddress([response.data.address?.colony, response.data.address?.city, response.data.address?.state].filter(Boolean).join(', '));
        }).catch((error) => setMessage(getApiErrorMessage(error, 'Unable to load profile')));
    }, []);

    const handleSave = async () => {
        const nextErrors: ProfileErrors = {};
        const nameError = validateFullName(name);
        const phoneError = validatePhoneNumber(phone);
        if (nameError) nextErrors.name = nameError;
        if (phoneError) nextErrors.phone = phoneError;
        if (!address.trim()) nextErrors.address = 'Address is required';
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setSaving(true);
        setMessage('');
        try {
            const response = await customerApi.updateProfile({ name: name.trim(), phone_number: phone.trim(), addressText: address.trim() });
            setProfile(response.data);
            setMessage('Profile updated successfully.');
        } catch (error) {
            setMessage(getApiErrorMessage(error, 'Unable to update profile'));
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async () => {
        setPasswordMessage('');
        if (!currentPassword || newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
            setPasswordMessage('New password must be at least 8 characters with a letter, number, and special character.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordMessage('New password and confirm password do not match.');
            return;
        }
        setChangingPassword(true);
        try {
            await customerApi.changePassword({ currentPassword, newPassword });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setPasswordMessage('Password updated successfully.');
        } catch (error) {
            setPasswordMessage(getApiErrorMessage(error, 'Unable to update password'));
        } finally {
            setChangingPassword(false);
        }
    };

    return (
        <Box sx={{ maxWidth: '800px' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: LABOUR_THEME.text, mb: 3 }}>My Profile</Typography>

            <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: '16px' }} elevation={0} variant="outlined">
                <Grid container spacing={3}>
                    {/* NON-EDITABLE FIELDS */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Full Name" fullWidth value={name} onChange={(event) => { setName(sanitizeFullName(event.target.value)); setErrors((current) => ({ ...current, name: undefined })); }} error={Boolean(errors.name)} helperText={errors.name} slotProps={{ htmlInput: { maxLength: VALIDATION.NAME_MAX_LENGTH } }} disabled={!profile || saving} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Username / Email" fullWidth value={profile ? `${profile.username} / ${profile.email}` : ''} disabled />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Date of Birth" fullWidth value={profile?.dob ?? ''} disabled />
                    </Grid>

                    {/* EDITABLE FIELDS */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Phone Number" fullWidth value={phone} onChange={(event) => { setPhone(formatPhoneNumber(event.target.value)); setErrors((current) => ({ ...current, phone: undefined })); }} error={Boolean(errors.phone)} helperText={errors.phone} type="tel" inputMode="numeric" slotProps={{ htmlInput: { maxLength: 13 } }} disabled={!profile || saving} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField label="Current Address" fullWidth multiline rows={3} value={address} onChange={(event) => { setAddress(event.target.value); setErrors((current) => ({ ...current, address: undefined })); }} error={Boolean(errors.address)} helperText={errors.address} disabled={!profile || saving} />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="success" size="large" onClick={() => void handleSave()} disabled={!profile || saving} sx={{ borderRadius: '8px' }}>
                        {saving ? <CircularProgress size={22} color="inherit" /> : 'Update Details'}
                    </Button>
                </Box>
                {message && <Typography sx={{ mt: 2, color: message.includes('successfully') ? LABOUR_THEME.primary : '#b91c1c' }}>{message}</Typography>}
            </Paper>

            <Paper sx={{ p: { xs: 2, sm: 4 }, mt: 3, borderRadius: '16px' }} elevation={0} variant="outlined">
                <Typography variant="h6" sx={{ mb: 3 }}>Change Password</Typography>
                {passwordMessage && <Alert severity={passwordMessage.includes('successfully') ? 'success' : 'error'} sx={{ mb: 2 }}>{passwordMessage}</Alert>}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, maxWidth: 700 }}>
                    <TextField label="Current Password" type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} disabled={changingPassword} fullWidth />
                    <TextField label="New Password" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} disabled={changingPassword} fullWidth />
                    <TextField label="Confirm New Password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} disabled={changingPassword} fullWidth />
                </Box>
                <Button variant="contained" color="warning" sx={{ mt: 3, borderRadius: '8px' }} onClick={() => void handlePasswordChange()} disabled={changingPassword}>
                    {changingPassword ? <CircularProgress size={22} color="inherit" /> : 'Update Password'}
                </Button>
            </Paper>
        </Box>
    );
};