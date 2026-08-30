"use client";

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Import renamed image assets matching slugs
import onlineOrdersAndSecureCheckout from '../../../../public/online-orders-and-secure-checkout.jpg';
import responsiveShoppingExperience from '../../../../public/responsive-shopping-experience.jpg';
import customerAndSalesManagement from '../../../../public/customer-and-sales-management.jpg';
import inventoryAndStoreManagement from '../../../../public/inventory-and-store-management.jpg';

import digitalMenuAndOnlineOrdering from '../../../../public/digital-menu-and-online-ordering.jpg';
import tableAndOrderManagement from '../../../../public/table-and-order-management.jpg';
import kitchenOrderManagement from '../../../../public/kitchen-order-management.jpg';
import salesAndBusinessReports from '../../../../public/sales-and-business-reports.jpg';

import coursesAndLearningMaterials from '../../../../public/courses-and-learning-materials.jpg';
import studentTeacherAndParentPortals from '../../../../public/student-teacher-and-parent-portals.jpg';
import feesAndPaymentManagement from '../../../../public/fees-and-payment-management.jpg';
import attendanceAndExaminationManagement from '../../../../public/attendance-and-examination-management.jpg';

import roomBookingAndReservations from '../../../../public/room-booking-and-reservations.jpg';
import guestManagement from '../../../../public/guest-management.jpg';
import roomAndHousekeepingManagement from '../../../../public/room-and-housekeeping-management.jpg';
import billingAndFinancialReports from '../../../../public/billing-and-financial-reports.jpg';

import projectAndPortfolioShowcase from '../../../../public/project-and-portfolio-showcase.jpg';
import skillsAndExperience from '../../../../public/skills-and-experience.jpg';
import testimonialsAndClientReviews from '../../../../public/testimonials-and-client-reviews.jpg';
import contactAndLeadGeneration from '../../../../public/contact-and-lead-generation.jpg';

const data = [
    {
        id: 1,
        title: "E-commerce & Business Management System",
        details: [
            {
                id: 1,
                title: "Online Orders & Secure Checkout",
                description:
                    "Provide a smooth shopping experience with product browsing, cart management, secure checkout, and multiple payment options.",
                image: onlineOrdersAndSecureCheckout,
            },
            {
                id: 2,
                title: "Responsive Shopping Experience",
                description:
                    "A fully responsive interface that works smoothly across desktops, tablets, and mobile devices.",
                image: responsiveShoppingExperience,
            },
            {
                id: 3,
                title: "Customer & Sales Management",
                description:
                    "Manage customers, orders, purchase history, sales records, and important business insights from one dashboard.",
                image: customerAndSalesManagement,
            },
            {
                id: 4,
                title: "Inventory & Store Management",
                description:
                    "Track product stock, manage inventory, monitor low-stock items, and organize multiple stores or branches efficiently.",
                image: inventoryAndStoreManagement,
            },
        ],
    },
    {
        id: 2,
        title: "Restaurant & Hospitality Management System",
        details: [
            {
                id: 1,
                title: "Digital Menu & Online Ordering",
                description:
                    "Allow customers to browse digital menus, view food details, and place orders quickly from any device.",
                image: digitalMenuAndOnlineOrdering,
            },
            {
                id: 2,
                title: "Table & Order Management",
                description:
                    "Manage tables, customer orders, reservations, and billing from one simple and organized system.",
                image: tableAndOrderManagement,
            },
            {
                id: 3,
                title: "Kitchen Order Management",
                description:
                    "Send orders directly to the kitchen, track preparation status, and improve communication between staff.",
                image: kitchenOrderManagement,
            },
            {
                id: 4,
                title: "Sales & Business Reports",
                description:
                    "Monitor daily sales, popular menu items, expenses, and business performance through detailed reports.",
                image: salesAndBusinessReports,
            },
        ],
    },
    {
        id: 3,
        title: "School & Learning Management System",
        details: [
            {
                id: 1,
                title: "Courses & Learning Materials",
                description:
                    "Organize courses, lessons, assignments, study materials, quizzes, and other educational resources.",
                image: coursesAndLearningMaterials,
            },
            {
                id: 2,
                title: "Student, Teacher & Parent Portals",
                description:
                    "Dedicated dashboards help students, teachers, and parents access important academic information easily.",
                image: studentTeacherAndParentPortals,
            },
            {
                id: 3,
                title: "Fees & Payment Management",
                description:
                    "Manage student fees, invoices, payment records, due amounts, and financial reports efficiently.",
                image: feesAndPaymentManagement,
            },
            {
                id: 4,
                title: "Attendance & Examination Management",
                description:
                    "Track attendance, manage examinations, record marks, publish results, and monitor student performance.",
                image: attendanceAndExaminationManagement,
            },
        ],
    },
    {
        id: 4,
        title: "Hotel & Property Management System",
        details: [
            {
                id: 1,
                title: "Room Booking & Reservations",
                description:
                    "Manage room availability, reservations, guest information, and booking schedules from one platform.",
                image: roomBookingAndReservations,
            },
            {
                id: 2,
                title: "Guest Management",
                description:
                    "Store guest details, booking history, preferences, and important information for better service.",
                image: guestManagement,
            },
            {
                id: 3,
                title: "Room & Housekeeping Management",
                description:
                    "Track room status, housekeeping tasks, maintenance requests, and room availability in real time.",
                image: roomAndHousekeepingManagement,
            },
            {
                id: 4,
                title: "Billing & Financial Reports",
                description:
                    "Manage room charges, additional services, payments, invoices, and overall financial reporting.",
                image: billingAndFinancialReports,
            },
        ],
    },
    {
        id: 5,
        title: "Personal & Agency Portfolio Website",
        details: [
            {
                id: 1,
                title: "Project & Portfolio Showcase",
                description:
                    "Present projects, case studies, images, and completed work in a professional and attractive layout.",
                image: projectAndPortfolioShowcase,
            },
            {
                id: 2,
                title: "Skills & Experience",
                description:
                    "Highlight technical skills, work experience, education, achievements, and professional expertise.",
                image: skillsAndExperience,
            },
            {
                id: 3,
                title: "Testimonials & Client Reviews",
                description:
                    "Build trust by displaying client feedback, testimonials, ratings, and successful collaborations.",
                image: testimonialsAndClientReviews,
            },
            {
                id: 4,
                title: "Contact & Lead Generation",
                description:
                    "Make it easy for potential clients to get in touch through contact forms, social links, and inquiry options.",
                image: contactAndLeadGeneration,
            },
        ],
    },
];

const DetailSlider = ({ details }) => {
    const sliderRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
        setScrollLeft(sliderRef.current?.scrollLeft || 0);
    };

    const handleMouseLeave = () => {
        setIsMouseDown(false);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isMouseDown || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Slider track on mobile/tablet (< lg), Grid layout on desktop (>= lg) */}
            <div
                ref={sliderRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 p-2 cursor-grab active:cursor-grabbing select-none lg:grid lg:grid-cols-4 lg:overflow-visible lg:snap-none lg:cursor-default"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {details.map((de, idx) => (
                    <motion.div
                        key={de.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="w-100 max-w-100 mx-auto shrink-0 snap-center lg:w-full lg:max-w-none lg:shrink lg:snap-align-none flex flex-col even:flex-col-reverse items-center justify-between gap-4 p-4 text-center lg:p-2"
                    >
                        <div className="w-full flex flex-col gap-3">
                            <h1 className="text-xl font-semibold">{de.title}</h1>
                            <p className="text-slate-600 text-sm leading-relaxed">{de.description}</p>
                        </div>
                        {de.image && (
                            <Image
                                width={400}
                                height={400}
                                src={de.image}
                                alt={de.title}
                                draggable={false}
                                className="w-full aspect-square overflow-hidden object-cover rounded-lg pointer-events-none"
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const Webs = () => {
    return (
        <div className="w-full overflow-hidden">
            {data && data.length > 0 && (
                <div className="w-full">
                    {data.map((d) => (
                        <motion.div
                            key={d.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.15 }}
                            transition={{ duration: 0.6 }}
                            className="w-full p-4 lg:p-20 flex flex-col items-center justify-center gap-8"
                        >
                            <motion.h1
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-2xl lg:text-4xl font-semibold text-primary text-center"
                            >
                                {d.title}
                            </motion.h1>
                            <DetailSlider details={d.details} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Webs;