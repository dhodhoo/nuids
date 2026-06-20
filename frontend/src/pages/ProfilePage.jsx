import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useApp } from '../context/AppContext'
import api from '../services/api'
import PageShell from '../components/layout/PageShell'
import PageHeader from '../components/layout/PageHeader'
import BottomNav from '../components/layout/BottomNav'

const accountSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  phone: z.string().optional(),
})

const childSchema = z.object({
  childName: z.string().min(1, 'Nama wajib diisi'),
  childBirth: z.string().min(1, 'Tanggal lahir wajib diisi'),
})

const inputClass = 'w-full h-[38px] rounded-lg bg-[#E0E0E0] border-none px-3 text-[13px] text-gray-700 outline-none'

function ProfileCard({ user, photo, onPhotoChange }) {
  const fileRef = useRef(null)

  function handleClick() {
    fileRef.current?.click()
  }

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onPhotoChange(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center mb-4">
      <div className="relative cursor-pointer" onClick={handleClick}>
        <div className="w-[72px] h-[72px] rounded-full border-2 border-primary flex items-center justify-center overflow-hidden bg-[#C5E7FF]">
          {photo ? (
            <img src={photo} alt="foto profil" className="w-full h-full object-cover" />
          ) : (
            <svg viewBox="0 0 24 24" fill="#58A5DA" className="w-10 h-10">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          )}
        </div>
        <div className="absolute -right-0.5 bottom-0.5 w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">✎</div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      <div className="mt-3 text-[15px] font-bold text-gray-900">{user?.name}</div>
      <div className="text-[13px] text-text-muted">{user?.email}</div>
    </div>
  )
}

function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-12 h-[26px] rounded-full transition-colors flex-shrink-0 ${enabled ? "bg-primary" : "bg-[#C5E7FF]"}`}
    >
      <div
        className={`absolute top-[3px] w-5 h-5 rounded-full bg-white shadow transition-all ${enabled ? "left-[25px]" : "left-[3px]"}`}
      />
    </button>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, child, logout, setUser, setChild } = useApp();
  const [notif, setNotif] = useState(true);
  const [gender, setGender] = useState(child?.gender || 'female');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [photo, setPhoto] = useState(localStorage.getItem('nuids_photo') || '');

  function handlePhotoChange(dataUrl) {
    setPhoto(dataUrl)
    localStorage.setItem('nuids_photo', dataUrl)
  }

  const accForm = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: { name: user?.name || "", phone: user?.phone || "" },
  });
  const childForm = useForm({
    resolver: zodResolver(childSchema),
    defaultValues: {
      childName: child?.name || "",
      childBirth: child?.birthDate || "",
    },
  });

  async function saveAccount(data) {
    setSaving(true);
    setError("");
    try {
      await api.auth.updateProfile(data);
      const me = await api.auth.me();
      setUser(me);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function saveChildInfo(data) {
    if (!child) return;
    setSaving(true);
    setError("");
    try {
      await api.children.update(child.id, {
        name: data.childName,
        birthDate: data.childBirth,
        gender,
      });
      const updated = await api.children.get(child.id);
      setChild(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <PageShell>
      <PageHeader title="Nuids" subtitle="Pengaturan Profil" />
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-2">
        <h1 className="text-[20px] font-bold text-gray-900 mb-4">
          Pengaturan Profil
        </h1>
        <ProfileCard user={user} photo={photo} onPhotoChange={handlePhotoChange} />

        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-primary"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
            <span className="text-[15px] font-bold text-gray-900">
              Informasi Akun
            </span>
          </div>
          <form onSubmit={accForm.handleSubmit(saveAccount)}>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Nama Lengkap
                </label>
                <input {...accForm.register("name")} className={inputClass} />
                {accForm.formState.errors.name && (
                  <p className="text-[12px] text-red-500 mt-1">
                    {accForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Email
                </label>
                <input
                  defaultValue={user?.email}
                  disabled
                  className={`${inputClass} text-gray-400`}
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  No. Handphone
                </label>
                <input
                  {...accForm.register("phone")}
                  placeholder="08xxxxxxxxxx"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="bg-primary text-white rounded-full px-5 py-2 text-[12px] font-bold hover:opacity-90 transition-opacity"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-primary"
            >
              <path d="M12 3C8.13 3 5 6.13 5 10c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="text-[15px] font-bold text-gray-900">
              Informasi Anak
            </span>
          </div>
          <form onSubmit={childForm.handleSubmit(saveChildInfo)}>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  {...childForm.register("childName")}
                  placeholder="Masukkan Nama Lengkap"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  {...childForm.register("childBirth")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                  Jenis Kelamin
                </label>
                <div className="flex gap-2.5">
                  {[
                    { v: "male", l: "Laki-laki" },
                    { v: "female", l: "Perempuan" },
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => setGender(opt.v)}
                      className={`flex-1 h-9 rounded-lg text-[12px] font-semibold transition-all ${gender === opt.v ? "bg-primary text-white" : "bg-[#E0E0E0] text-gray-800"}`}
                    >
                      {opt.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="bg-primary text-white rounded-full px-5 py-2 text-[12px] font-bold hover:opacity-90 transition-opacity"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="mb-3 text-center">
            <span className="text-[13px] text-red-500 font-medium">
              {error}
            </span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-start gap-3 flex-1">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0"
              >
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
              <div>
                <div className="text-[14px] font-bold text-gray-900 mb-0.5">
                  Pengaturan Notifikasi
                </div>
                <div className="text-[12px] text-text-muted">
                  Pengingat input mingguan
                </div>
              </div>
            </div>
            <ToggleSwitch
              enabled={notif}
              onChange={() => setNotif((v) => !v)}
            />
          </div>
        </div>

        <div className="flex justify-center py-2 pb-6">
          <button
            onClick={handleLogout}
            className="w-56 h-12 bg-white text-red-500 font-bold text-[15px] rounded-full shadow-sm hover:opacity-90 transition-opacity"
          >
            Keluar
          </button>
        </div>
      </div>
      <BottomNav />
    </PageShell>
  );
}
