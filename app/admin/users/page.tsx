"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  Users,
  Check,
  X,
  Clock,
  Shield,
  Loader2,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Calendar,
} from "lucide-react";
import Swal from "sweetalert2";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  is_approved: boolean;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: "Approve Admin?",
      text: `Grant administrative access to ${name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#01172C",
      confirmButtonText: "Yes, approve",
    });

    if (result.isConfirmed) {
      try {
        await api.put(`/users/${id}/approve`);
        setUsers(
          users.map((u) => (u.id === id ? { ...u, is_approved: true } : u)),
        );
        Swal.fire("Approved!", "The user can now log in.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to approve user", "error");
      }
    }
  };

  const handleReject = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: "Reject Request?",
      text: `Deny and remove the request from ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#01172C",
      confirmButtonText: "Yes, reject",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/users/${id}/reject`);
        setUsers(users.filter((u) => u.id !== id));
        Swal.fire("Rejected", "The request has been removed.", "info");
      } catch (error) {
        Swal.fire("Error", "Failed to reject user", "error");
      }
    }
  };

  const pendingUsers = users.filter((u) => !u.is_approved);
  const approvedUsers = users.filter((u) => u.is_approved);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            Access Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review and manage administrative access requests for the platform.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {pendingUsers.length} Pending Requests
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <p className="text-slate-500 font-medium">Loading user list...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {/* Section: Pending Requests */}
          <div className="space-y-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
              Pending Approvals
            </h2>
            {pendingUsers.length === 0 ? (
              <div className="p-12 text-center bg-white/50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                <Clock className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                <p className="text-sm font-medium text-slate-500">
                  No pending access requests at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-amber-200 dark:border-amber-900/30 shadow-lg shadow-amber-500/5 group hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center text-amber-600">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <div className="text-[10px] font-black bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-md uppercase">
                        Pending
                      </div>
                    </div>
                    <div className="mb-6">
                      <h3 className="font-bold text-slate-900 dark:text-white truncate">
                        {user.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-3 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Requested:{" "}
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleApprove(user.id, user.name)}
                        className="py-2.5 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(user.id, user.name)}
                        className="py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-xl hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Ignore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Approved Users */}
          <div className="space-y-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
              Authorized Administrators
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Administrator
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Role
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Joined On
                      </th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {approvedUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {user.name}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/5 text-primary text-[10px] font-black rounded-lg uppercase">
                            <Shield className="w-3 h-3" />
                            {user.role}
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                            {new Date(user.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button
                            onClick={() => handleReject(user.id, user.name)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Revoke Access"
                          >
                            <UserX className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
